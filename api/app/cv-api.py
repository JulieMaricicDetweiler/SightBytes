from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from random import randint

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


