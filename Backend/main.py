from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from ultralytics import YOLO
import cv2, numpy as np, os, time, shutil
from dotenv import load_dotenv
import os

app = FastAPI()
model = YOLO("yolov5su.pt")
load_dotenv()
BACKEND_URL = os.getenv("BACKEND_URL")
# BACKEND_URL = "https://vehicle-detection-backend.onrender.com"

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://vehicle-density-and-detection-app.vercel.app",
        "http://localhost:5173"
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)

OUTPUT_DIR = "output"
os.makedirs(OUTPUT_DIR, exist_ok=True)

VEHICLE_CLASSES = ["Car", "Truck", "Bus", "Motorbike", "Auto", "Person"]

@app.post("/detect")
async def detect(file: UploadFile = File(...)):
    # 🧹 Clear output directory before each new run
    if os.path.exists(OUTPUT_DIR):
        for f in os.listdir(OUTPUT_DIR):
            file_path = os.path.join(OUTPUT_DIR, f)
            try:
                if os.path.isfile(file_path) or os.path.islink(file_path):
                    os.unlink(file_path)
                elif os.path.isdir(file_path):
                    shutil.rmtree(file_path)
            except Exception as e:
                print(f"Error clearing file {file_path}: {e}")

    # Fixed filenames for consistent overwriting
    contents = await file.read()
    file_ext = os.path.splitext(file.filename)[-1].lower()
    filename = f"input{file_ext}"
    input_path = os.path.join(OUTPUT_DIR, filename)
    output_name = "processed_output.mp4"
    output_path = os.path.join(OUTPUT_DIR, output_name)

    with open(input_path, "wb") as f:
        f.write(contents)

    start = time.time()
    total_vehicles = 0

    # ---------- IMAGE ----------
    if file_ext in [".jpg", ".jpeg", ".png"]:
        frame = cv2.imread(input_path)
        results = model(frame, conf=0.3, save=False)

        for result in results:
            for box in result.boxes:
                x1, y1, x2, y2 = map(int, box.xyxy[0])
                conf = float(box.conf[0])
                cls_idx = int(box.cls[0])
                cls_name = (
                    VEHICLE_CLASSES[cls_idx]
                    if cls_idx < len(VEHICLE_CLASSES)
                    else "Unknown"
                )

                if conf > 0.3:
                    total_vehicles += 1
                    # ---- EXACT STYLE ----
                    cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 255), 1)
                    cv2.putText(frame, f"{cls_name} {conf:.2f}", (x1, y1 - 5),
                                cv2.FONT_HERSHEY_SIMPLEX, 0.5, (93, 240, 19), 1)

        image_output = output_path.replace(".mp4", ".jpg")
        cv2.imwrite(image_output, frame)
        processed_url = f"{BACKEND_URL}/file/{os.path.basename(image_output)}"

    # ---------- VIDEO ----------
    elif file_ext in [".mp4", ".mov", ".avi"]:
        cap = cv2.VideoCapture(input_path)
        fourcc = cv2.VideoWriter_fourcc(*"avc1")  # browser-friendly codec
        width, height = int(cap.get(3)), int(cap.get(4))
        fps_in = cap.get(cv2.CAP_PROP_FPS) or 20.0
        out = cv2.VideoWriter(output_path, fourcc, fps_in, (width, height))

        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break

            results = model(frame, conf=0.3, save=False)
            for result in results:
                for box in result.boxes:
                    x1, y1, x2, y2 = map(int, box.xyxy[0])
                    conf = float(box.conf[0])
                    cls_idx = int(box.cls[0])
                    cls_name = (
                        VEHICLE_CLASSES[cls_idx]
                        if cls_idx < len(VEHICLE_CLASSES)
                        else "Unknown"
                    )

                    if conf > 0.3:
                        # ---- EXACT STYLE ----
                        cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 255), 1)
                        cv2.putText(frame, f"{cls_name} {conf:.2f}", (x1, y1 - 5),
                                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, (93, 240, 19), 1)

            out.write(frame)

        cap.release()
        out.release()
        processed_url = f"{BACKEND_URL}/file/{os.path.basename(output_path)}"

    else:
        return {"error": "Unsupported file format"}

    # ---------- STATS ----------
    density = "High" if total_vehicles >= 20 else "Medium" if total_vehicles >= 7 else "Low"
    fps = round(1 / (time.time() - start + 1e-6), 2)

    return {
        "vehicles": total_vehicles,
        "density": density,
        "fps": fps,
        "processed_url": processed_url,
    }


@app.get("/file/{filename}")
async def get_file(filename: str):
    file_path = os.path.join(OUTPUT_DIR, filename)
    if os.path.exists(file_path):
        if filename.endswith(".mp4"):
            return FileResponse(file_path, media_type="video/mp4")
        elif filename.endswith((".jpg", ".jpeg", ".png")):
            return FileResponse(file_path, media_type="image/jpeg")
    return {"error": "File not found"}

