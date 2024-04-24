# SightBytes Project

## Team Members

- [Tam Huynh] (tamhuynh3861@gmail.com) - Backend Developer
- [Julie Maricic-Detweiler] (j.maricicdetweil@ufl.edu) - Scrum Master
- [Taise Miyazumi] (taisemiyazumi@gmail.com) - Fullstack Developer
- [Kevin Zhang] (kzhang7802@gmail.com) - Frontend Developer
- [Yash Hegde] (yash.hegde.2020@gmail.com) - Project Manager

## Technologies Used

- ReactJS
- Firebase
- FastAPI
- OpenCV
- MaterialUI
- Docker
- Azure

## Setting up the Development Environment

### 1. Install Anaconda

Anaconda is a popular data science platform that comes with Python and various libraries pre-installed. You can download the latest version of Anaconda from the official website: [https://www.anaconda.com/download/](https://www.anaconda.com/download/)

Follow the installation instructions for your operating system.

### 2. Create a Firebase Application

Firebase is a comprehensive app development platform provided by Google. You'll need to create a new Firebase project for your application.

1. Go to the Firebase Console: [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Create a new project or select an existing one.
3. Follow the instructions to set up your Firebase project, including configuring authentication, database, and other necessary services.

### 3. Clone the Repository

Clone the project repository to your local machine using the following command:

```git clone https://github.com/your-repo-url.git```

## Running the API on Docker

### 1. Build Docker Image

Navigate to the `/api` directory and build the Docker image:

```cd /api```

```docker build -t opencv-api .```

### 2. Run Docker Container

After building the Docker image, you can run the API locally using the following command:

```docker run -d --name myopencvapi -p 80:80 opencv-api```

This will start the API container and map port 80 of the container to port 80 of your local machine.

### 3. Push Docker Image to Azure Container Registry (Requires Payment for Full Appplication)

If you plan to deploy the API to Azure, you'll need to push the Docker image to an Azure Container Registry (ACR). Follow these steps:

1. Log in to your Azure CLI:

```az login```

2. Log in to your Azure Container Registry:

```az acr login --name <your-acr-name>```

3. Tag the Docker image with your ACR details:

```docker tag opencv-api:latest <your-acr-name>.azurecr.io/opencv-api:latest```

4. Push the Docker image to ACR:

docker push <your-acr-name>.azurecr.io/opencv-api:latest

## Running the API Locally (Optional)

If you prefer to run the API locally without Docker, follow these steps:

1. Create a new Anaconda environment:

```conda create --name SightByte```

2. Activate the environment:

```conda activate SightByte```

3. Navigate to the `/api` directory and install the required dependencies:

```cd /api```

```pip install -r requirements.txt```

4. Start the API server:

```cd /app```

```uvicorn cv-api:app --host 0.0.0.0 --port 8000```

The API will be accessible at `http://localhost:8000`.

## Starting the Application Locally

1. Navigate to the `/application` directory:

```cd /application```

2. Install the dependencies:

```npm install```

3. Start the development server:

```npm start```

The application will be accessible at `http://localhost:3000`.

