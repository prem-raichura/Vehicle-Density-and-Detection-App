# 🚗 Vehicle Density and Detection App

![Author](https://img.shields.io/badge/Developed%20By-Prem%20Raichura-blue?style=for-the-badge)
![Python](https://img.shields.io/badge/Python-3.8%2B-blue?style=for-the-badge&logo=python)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-yellow?style=for-the-badge&logo=javascript)
![YOLOv5](https://img.shields.io/badge/YOLOv5-PyTorch-orange?style=for-the-badge)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)

An AI-powered web application that uses a **YOLOv5su** model trained on the **IITMhetra dataset** to detect and analyze vehicles in uploaded images or videos. This tool is built for accurate, real-time-capable traffic monitoring.

---

## 🚀 Live Demo

**See it in action!** The application is live and deployed on Vercel:

### [https://vehicle-dencity-and-detection-app.vercel.app/](https://vehicle-dencity-and-detection-app.vercel.app/)

---

## 📋 Table of Contents

* [Overview](#-overview)
* [Features](#-features)
* [Tech Stack](#-tech-stack)
* [Model Details](#-model-details)
* [Installation & Setup](#-installation--setup)
    * [Prerequisites](#prerequisites)
    * [Backend Setup](#backend-setup)
    * [Frontend Setup](#frontend-setup)
* [Developed By](#-developed-by)
* [Acknowledgements](#-acknowledgements)

---

## 📝 Overview

This project provides a simple yet powerful web interface for traffic analysis. The core of the application is a custom-trained **YOLOv5** (You Only Look Once) model, which can process images or videos to identify and count vehicles.

Users can upload their media files, and the backend service will:
1.  Process the file using the AI model.
2.  Draw bounding boxes around all detected vehicles.
3.  Calculate the total number of vehicles (density).
4.  Return the processed media for the user to view.

This tool is ideal for traffic monitoring, urban planning analysis, or as a powerful demonstration of computer vision in practice.


## ✨ Features

* **Image & Video Processing:** Upload `.jpg`, `.png`, or `.mp4` files for analysis.
* **Multi-Class Vehicle Detection:** Identifies multiple classes of vehicles (e.g., car, bus, truck, motorcycle).
* **Bounding Box Visualization:** Clearly displays detected vehicles with labeled bounding boxes.
* **Vehicle Density Count:** Provides a total count of detected vehicles in the frame or video.
* **Responsive Web Interface:** A clean and easy-to-use interface accessible from any device.

---

## 💻 Tech Stack

This project is a full-stack application composed of:

* **Backend:**
    * **Python:** The core language for the backend.
    * **Flask / FastAPI:** (Please update this) The web framework serving the AI model.
    * **PyTorch:** The deep learning framework used to run the model.
    * **YOLOv5:** The object detection model architecture.
    * **OpenCV:** For image and video processing tasks.

* **Frontend:**
    * **JavaScript:** For all client-side logic.
    * **React + Vite:** The JavaScript library/framework for building the user interface.
    * **HTML5 & CSS3:** For structuring and styling the application.

* **Deployment:**
    * **Vercel:** Hosting for the frontend application.
    * (The backend may be hosted on Vercel as well, or another service like Heroku/AWS).

---

## 🧠 Model Details

* **Model:** `YOLOv5su` (a specific YOLOv5 variant).
* **Dataset:** Custom-trained on the **[IITMhetra dataset](https://www.kaggle.com/datasets/deepak242424/iitmhetra)**, which is specifically designed for Indian traffic conditions.
* **Detected Classes:** (Please list the classes your model detects, e.g., Car, Bus, Truck, Motorcycle, Auto-rickshaw).

---

## ⚙️ Installation & Setup

To run this project on your local machine, follow these steps.

### Prerequisites

* [Git](https://git-scm.com/)
* [Python 3.8+](https://www.python.org/)
* [Node.js](https://nodejs.org/en/) (which includes npm)

### 1. Clone the Repository

```bash
git clone [https://github.com/prem-raichura/Vehicle-Dencity-and-Detection-App.git](https://github.com/prem-raichura/Vehicle-Dencity-and-Detection-App.git)
cd Vehicle-Dencity-and-Detection-App
```

### 2. Backend Setup

```bash
# Navigate to the backend directory
cd Backend

# Create a Python virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install the required Python packages
# (Note: You may need to create a requirements.txt file)
pip install flask opencv-python torch torchvision 
# Add any other dependencies

# Run the backend server
python app.py  # (Or your main Python script)
```
> The backend server will typically run on `http://localhost:5000`.

### 3. Frontend Setup

```bash
# Open a new terminal and navigate to the frontend directory
cd ../frontend

# Install the required Node.js packages
npm install

# Start the frontend development server
npm start
```
> The frontend application will typically run on `http://localhost:3000`.

Open `http://localhost:3000` in your browser to use the application.

---

## 🧑‍💻 Developed By

**Prem Raichura**
* **GitHub:** [prem-raichura](https://github.com/prem-raichura)
* **LinkedIn:** [prem-raichura](https://www.linkedin.com/in/prem-raichura/)
