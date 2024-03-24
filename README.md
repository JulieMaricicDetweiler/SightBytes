# SightBytes
Senior Project

# Build Docker image
docker build -t opencv-api .

# Run docker image
docker run -d --name myopencvapi -p 80:80 opencv-api

# Pushing docker onto Azure

docker tag opencv-api:latest sightbyteapi.azurecr.io/opencv-api:latest

az acr login --name sightbyteapi

docker push sightbyteapi.azurecr.io/opencv-api:latest
