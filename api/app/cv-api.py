from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from random import randint
from uuid import uuid4

import cv2
import numpy as np
import cvzone 
from cvzone.FaceMeshModule import FaceMeshDetector
from pydantic import BaseModel
import base64
import io
from imageio import imread
import matplotlib.pyplot as plt
from typing import List
from datetime import datetime

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow asll methods
    allow_headers=["*"],
)

class Question(BaseModel):
    questionId: int
    answer: str
    letter: str

    class Config:
        extra = "allow"

class SessionData(BaseModel):
    leftEyeQuestions: List[Question]
    rightEyeQuestions: List[Question]

    class Config:
        extra = "allow"

class DistanceRequest(BaseModel):
    image_base64: str


focalPoint = None

@app.post("/calibrate")
async def calibrate(request: DistanceRequest):
    global focalPoint
    try:
        detector = FaceMeshDetector(maxFaces=2)
        
        # print(request.image_base64)
        temp = request.image_base64.split(",")[-1]
        image_data = base64.b64decode(temp)
        print("Converting...")
        
        nparr = np.frombuffer(image_data, np.uint8)
        # print("Past convert 1...")
        print(nparr)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)    
        # print("Past convert 2...")
        # Check if the image is loaded correctly
        if img is None:
            raise HTTPException(status_code=400, detail="Failed to load image")

        # Initialize FaceMeshDetector
        detector = FaceMeshDetector(maxFaces=2)
        # print("Past convert 3...")

        # Find face mesh in the image
        img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)  # Convert to RGB
        # print("Past convert 4...")
        img, faces = detector.findFaceMesh(img_rgb)
        # print("Past convert 5...")

        if faces:
            print(10000)
            face = faces[0]
            pointLeft = face[145]
            pointRight = face[374]
            w, _ = detector.findDistance(pointLeft, pointRight)
            
            # find focal point first 
            W = 6.3 # Average distance between eyes

            # finding focal point
            d = 30
            f = (w*d)/ W
            # Constants for calculations
          
            # f = 650  # Focal length (adjust this according to your setup)
            
            # Calculate distance
            # d = (W * f) / w
            
            # Display the distance on the image
            # cv2.putText(img, f'Depth: {d:.2f} cm', (face[10][0] - 75, face[10][1] - 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
            print(f)
            focalPoint = f
            return {"focalPoint": f}

        else:
            return HTTPException(status_code=400, detail="No face detected in the image.")
    except Exception as e:
        return HTTPException(status_code=500, detail=str(e))



@app.post("/distance")
async def calculate_distance(request: DistanceRequest):
    global focalPoint
    print("FOCALLLLL")
    print(focalPoint)
    try:
        detector = FaceMeshDetector(maxFaces=2)
        
        # print(request.image_base64)
        temp = request.image_base64.split(",")[-1]
        image_data = base64.b64decode(temp)
        print("Converting...")
        
        nparr = np.frombuffer(image_data, np.uint8)
        print("Past convert 1...")
        print(nparr)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)    
        print("Past convert 2...")
        # Check if the image is loaded correctly
        if img is None:
            raise HTTPException(status_code=400, detail="Failed to load image")

        # Initialize FaceMeshDetector
        detector = FaceMeshDetector(maxFaces=2)
        print("Past convert 3...")

        # Find face mesh in the image
        img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)  # Convert to RGB
        print("Past convert 4...")
        img, faces = detector.findFaceMesh(img_rgb)
        print("Past convert 5...")

        if faces:
            print(10000)
            face = faces[0]
            pointLeft = face[145]
            pointRight = face[374]
            w, _ = detector.findDistance(pointLeft, pointRight)
            
            # find focal point first 
            W = 6.3 # Average distance between eyes

            # finding focal point
            # d = 31
            # f = (w*d)/ W
            # Constants for calculations
          
            f = focalPoint  # Focal length (adjust this according to your setup)
            
            # Calculate distance
            d = (W * f) / w
            
            # Display the distance on the image
            # cv2.putText(img, f'Depth: {d:.2f} cm', (face[10][0] - 75, face[10][1] - 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
            print(d)
            return {"distance": d}

        else:
            return HTTPException(status_code=400, detail="No face detected in the image.")
    except Exception as e:
        return HTTPException(status_code=500, detail=str(e))
    
@app.get("/randnum")
def random_number():
    randNum = randint(0,100) #generate random integer 0-100
    return {"random_number": randNum}


@app.post("/create-session")
def create_session():
    # Generate a unique session ID
    session_id = str(uuid4())
    return {"session_id": session_id}

@app.post("/score")
async def score_session(data: SessionData):
    def calculate_results(questions):
        totalQuestions = len(questions)
        correctAnswers = sum(1 for q in questions if q.answer.upper() == q.letter.upper())
        detailedResults = [
            {"question": q.questionId, "answer": q.answer.upper(), "letter": q.letter.upper(), "correct": q.answer.upper() == q.letter.upper()}
            for q in questions
        ]
        return totalQuestions, correctAnswers, detailedResults

    totalLeftQuestions, leftCorrectAnswers, leftDetails = calculate_results(data.leftEyeQuestions)
    totalRightQuestions, rightCorrectAnswers, rightDetails = calculate_results(data.rightEyeQuestions)
    curr_date = datetime.now().date()

    def get_test_result(x):
        if (x == 1):
            return "20/200";
        elif (x == 2):
            return "20/100";
        elif (x == 3):
            return "20/70";
        elif (x == 4):
            return "20/50";
        elif (x == 5):
            return "20/40";
        elif (x == 6):
            return "20/30";
        elif (x == 7):
            return "20/25";
        elif (x == 8):
            return "20/20";
        elif (x == 9):
            return "20/15";
        elif (x == 10):
            return "20/13";
        else:
            return "20/200";
    
    leftResult = get_test_result(leftCorrectAnswers);
    rightResult = get_test_result(rightCorrectAnswers);

    

    return {
        "leftEye": {
            "totalQuestions": totalLeftQuestions,
            "correctAnswers": leftCorrectAnswers,
            "questions": leftDetails,
            "result": leftResult
        },
        "rightEye": {
            "totalQuestions": totalRightQuestions,
            "correctAnswers": rightCorrectAnswers,
            "questions": rightDetails,
            "result": rightResult
        },
        "date": curr_date
    }