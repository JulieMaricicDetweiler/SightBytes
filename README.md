### SightBytes
Senior Project

### Running API on Docker
# Build Docker image
cd /api

docker build -t opencv-api .

# Run docker image, at this point, you can run the api locally
docker run -d --name myopencvapi -p 80:80 opencv-api

# Pushing docker onto Azure

docker tag opencv-api:latest sightbyteapi.azurecr.io/opencv-api:latest

az acr login --name sightbyteapi

docker push sightbyteapi.azurecr.io/opencv-api:latest

### Running API locally
(optional) conda create --name SightByte
(optional) conda activate SightByte

cd /api
pip install -r requirements.txt

cd /app
uvicorn cv-api:app --host 0.0.0.0 --port 80

### Starting Application Locally
cd application
npm i -y
npm start
