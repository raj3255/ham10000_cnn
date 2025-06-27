
# SkinCancer AI

**A machine learning web app for classifying skin lesions using a trained CNN model.**  
Upload an image, and it predicts the lesion type.

---

## Project Overview

- **Frontend (React)**:  
  - Upload skin lesion images.  
  - Receive predicted class and confidence.  
  - Map numeric class to meaningful labels & descriptions (stored in `labelInfo.js`).

- **Backend (FastAPI + MySQL + TensorFlow)**:  
  - Handles user registration & login.  
  - Accepts image uploads, runs model inference, stores predictions in MySQL.  
  - Predicts class index & confidence score via `/api/upload`.

---

## Model & Dataset (HAM10000)

Since the dataset isn't publicly included, here’s an overview( becouse of large size):

- **HAM10000 (“Human Against Machine with 10K images”)**  
  - ~10,015 dermatoscopic images across **7 diagnostic categories** :contentReference[oaicite:1]{index=1}.  
  - Lesions verified via histopathology, follow‑up, expert consensus, or confocal microscopy :contentReference[oaicite:2]{index=2}.  
  - Categories: `akiec`, `bcc`, `bkl`, `df`, `mel`, `nv`, `vasc`.

- **Model Training**  
  - Trained a CNN on resized lesion images, achieving 75% validation accuracy with pretrained model (mibilenet) and with custom build model it is 70% as the data size is small and highly imbalanced its hard to achieve higher accuracy.  
  - Final model saved as `.keras` for backend inference.
  and other model can be saved using .ipynb notebook.

---