from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import mysql.connector
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow all origins for development (you can restrict it in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or use ["http://localhost:3000"] for stricter control
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

# Create users table if not exists
def create_users_table():
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
    conn.commit()
    cursor.close()
    conn.close()

create_users_table()

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
def login(user: User):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM users WHERE email = %s AND password = %s",
                   (user.email, user.password))
    result = cursor.fetchone()
    cursor.close()
    conn.close()

    if not result:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {"message": "Login successful", "username": result["username"]}
