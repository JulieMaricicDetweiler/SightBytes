from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from random import randint
from uuid import uuid4

import cv2
import numpy as np

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow asll methods
    allow_headers=["*"],
)

@app.get("/randnum")
def random_number():
    randNum = randint(0,100) #generate random integer 0-100
    return {"random_number": randNum}


@app.post("/create-session")
def create_session():
    # Generate a unique session ID
    session_id = str(uuid4())
    return {"session_id": session_id}




