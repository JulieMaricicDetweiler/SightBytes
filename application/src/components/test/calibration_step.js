import React, { useCallback, useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { Container, Box, Button, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

const Calibration_Step = () => {
  const webcamRef = useRef(null);
  const [distance, setDistance] = useState(null);
  const [focalPoint, setFocalPoint] = useState(null);
  const [finalFocalPoint, setFinalFocalPoint] = useState(null);
  const [intervalId, setIntervalId] = useState(null);

  const capture = useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const base64Image = await convertImageToBase64(imageSrc);

    try {
      const response = await axios.post("http://localhost:8000/calibrate", {
        image_base64: base64Image,
      });
      setFocalPoint(response.data.focalPoint);
    } catch (error) {
      console.error("Error calculating distance:", error);
    }
  }, []);

  const setFinal = () => {
    setFinalFocalPoint(focalPoint);
  }

  useEffect(() => {
    console.log(finalFocalPoint);
    
  }, [finalFocalPoint]);

  useEffect(() => {
    const interval = setInterval(capture, 1000);
    setIntervalId(interval);

    return () => {
      clearInterval(interval);
    };
  }, [capture]);

  const convertImageToBase64 = (imageSrc) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const base64Data = canvas.toDataURL("image/jpeg");
        resolve(base64Data);
      };
      img.onerror = reject;
      img.src = imageSrc;
    });
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2em",
        marginTop: "5vw",
      }}
    >
      <Box
        sx={{ width: "80%", display: "flex", justifyContent: "flex-end" }}
      >
        <Link to="/">
          <Button>
            <CloseIcon fontSize={"medium"} />
          </Button>
        </Link>
      </Box>
      <Box
        sx={{
          maxWidth: "78.5%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Typography
          noWrap
          sx={{
            display: "flex",
            justifyContent: "center",
            fontFamily: "helvetica",
            fontWeight: 500,
            color: "black",
            typography: { xs: "h5", sm: "h4", md: "h3" },
          }}
        >
          Calibration Step
        </Typography>
        <Webcam height={600} width={600} ref={webcamRef} />
        {finalFocalPoint && (
          <Typography variant="body1">
            Focal Point: {finalFocalPoint.toFixed(2)} 
          </Typography>
        )}
        <Button variant="contained" onClick={setFinal}>
          Capture Focal Point
        </Button>
      </Box>
    </Container>
  );
};

export default Calibration_Step;
