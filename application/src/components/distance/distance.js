import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";

const DistanceCalculator = () => {
  const webcamRef = useRef(null);
  const [distance, setDistance] = useState(null);

  const capture = useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const base64Image = await convertImageToBase64(imageSrc);
  
    try {
      const response = await axios.post("http://localhost:8000/distance", {
        image_base64: base64Image,
      });
      setDistance(response.data.distance);
    } catch (error) {
      console.error("Error calculating distance:", error);
    }
  }, []);

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
    <div className="container">
      <Webcam height={600} width={600} ref={webcamRef} />
      <button onClick={capture}>Capture</button>
      {distance && <p>Distance: {distance.toFixed(2)} cm</p>}
    </div>
  );
};

export default DistanceCalculator;
