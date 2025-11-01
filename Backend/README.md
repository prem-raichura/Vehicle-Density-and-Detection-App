# 🚦 Vehicle Dencity & Detection-App — Backend (FastAPI + YOLOv5su)

The **backend** for TrafficEye — a powerful **FastAPI** service that performs vehicle detection and traffic density estimation using the **YOLOv5su model** trained on the **IITMHeTRA dataset**.  
It processes both images and videos and returns results with bounding boxes, confidence scores, vehicle counts, and density levels.

---

## ✨ Features

- 🧠 YOLOv5su model trained on IITMHeTRA dataset  
- 🚗 Detects Cars, Trucks, Buses, Motorbikes, Autos & Persons  
- 🎥 Supports both image and video uploads  
- ⚙️ Automatically replaces existing output files each run  
- 📊 Returns vehicle count, traffic density & FPS  
- 🔄 CORS enabled for easy frontend integration  
- 🧹 Clears old processed files for each new detection  

---

## 🧱 Tech Stack

| Technology | Purpose |
|-------------|----------|
| **FastAPI** | Backend web framework |
| **YOLOv5su (Ultralytics)** | Object detection model |
| **OpenCV (cv2)** | Image and video processing |
| **NumPy** | Numerical operations |
| **Uvicorn** | ASGI server for FastAPI |
| **Python 3.10+** | Programming language |

---

## 🚀 Getting Started (Local Setup)

### 🧩 Prerequisites
- Python 3.10 or later  
- pip (Python package manager)  
- YOLOv5 model file: `yolov5su.pt` (place it inside the backend folder)
