from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from random import randint

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],
)

@app.get("/randnum")

def random_number():
    randNum = randint(0,100) #generate random integer 0-100
    return {"random_number": randNum}


