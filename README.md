# SightBytes
Senior Project

# Build Docker image
docker build -t opencv-api .

# Run docker image
docker run -d --name myopencvapi -p 80:80 opencv-api

