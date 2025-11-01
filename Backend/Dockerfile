# --- Base image ---
FROM python:3.10-slim

# --- Set working directory ---
WORKDIR /app

# --- Install system dependencies (for OpenCV) ---
RUN apt-get update && apt-get install -y --no-install-recommends \
    libgl1 \
    libglib2.0-0 \
 && rm -rf /var/lib/apt/lists/*

# --- Copy requirements first (cache layer) ---
COPY requirements.txt .

# --- Install Python packages ---
RUN pip install --no-cache-dir -r requirements.txt

# --- Copy all code and model ---
COPY . .

# --- Create output directory ---
RUN mkdir -p output

# --- Expose FastAPI port ---
EXPOSE 8000

# --- Start FastAPI app ---
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
