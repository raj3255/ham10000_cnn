from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from pydantic import BaseModel
import mysql.connector
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
import numpy as np


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MySQL connection config
def get_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="Sunny2005@",
        database="skincare_ai"
    )

# Pydantic model for request body
class User(BaseModel):
    username: str
    email: str
    password: str  # In production, use hashing
#creating login model
class LoginModel(BaseModel):
    email:str
    password:str
# Create users table if not exists
def create_tables():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255),
            email VARCHAR(255) UNIQUE,
            password VARCHAR(255)
        )
    """)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS predictions (
            id INT AUTO_INCREMENT PRIMARY KEY, 
            user_id INT, 
            class_idx INT, 
            confidence FLOAT, 
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    """)
    conn.commit()
    cursor.close()
    conn.close()

create_tables()

model=tf.keras.models.load_model("ham1000_cnn_model_128improved.keras")
# Register route
@app.post("/api/register")
def register(user: User):
    conn = get_connection()
    cursor = conn.cursor()

    # Check if email already exists
    cursor.execute("SELECT * FROM users WHERE email = %s", (user.email,))
    if cursor.fetchone():
        cursor.close()
        conn.close()
        raise HTTPException(status_code=400, detail="Email already registered")

    cursor.execute("INSERT INTO users (username, email, password) VALUES (%s, %s, %s)",
                   (user.username, user.email, user.password))
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "User registered successfully"}

# Login route
@app.post("/api/login")
def login(login: LoginModel):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM users WHERE email = %s AND password = %s",
                   (login.email, login.password))
    result = cursor.fetchone()
    cursor.close()
    conn.close()

    if not result:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {"message": "Login successful", "username": result["username"]}

@app.post("/api/upload")
async def upload_image(user_id: int = Form(...), file: UploadFile = File(...)):
    contents = await file.read()
    IMG_HEIGHT = 128
    IMG_WIDTH = 128
    img = tf.image.decode_image(contents, channels=3)
    img = tf.image.resize(img, [IMG_HEIGHT, IMG_WIDTH])
    img = img[None, ...] / 255.0  # Normalize

    preds = model.predict(img)
    class_idx = int(np.argmax(preds, axis=1)[0])
    confidence = float(np.max(preds))
    # You can map idx → class name here
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO predictions (user_id, class_idx, confidence)
        VALUES ( %s, %s, %s)
    """, (user_id, class_idx, confidence))
    conn.commit()
    cursor.close()
    conn.close()

    return {
        "class_idx": class_idx, 
        "confidence": confidence,
        "filename":file.filename
        }
