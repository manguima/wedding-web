"use client";

import React, { useRef, useState, useEffect } from "react";

export default function CameraComponent() {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Start camera with specified facing mode
  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
      });
      setHasPermission(true);
      setError(null);
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "NotAllowedError") {
        setHasPermission(false);
        setError("Camera access denied. Please enable camera permissions.");
      } else {
        setError("An error occurred while accessing the camera.");
      }
      console.error("Error accessing camera:", error);
    }
  };

  // Stop the camera feed
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  // Switch between front and back cameras
  const switchCamera = () => {
    stopCamera();
    setFacingMode((prevMode) => (prevMode === "user" ? "environment" : "user"));
  };

  // Capture current frame to canvas and get base64
  const takePicture = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if (context) {
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

        // Get the base64 data URL of the image
        const base64Image = canvas.toDataURL("image/png");
        console.log("Captured Image in Base64:", base64Image);
      }
    }
  };

  // Effect to start camera on component mount and restart if facing mode changes
  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, [facingMode]);

  return (
    <div>
      {hasPermission === false ? (
        <div>
          <p>{error}</p>
          <button onClick={startCamera}>Retry</button>
        </div>
      ) : (
        <div>
          <button onClick={switchCamera}>Switch Camera</button>
          <button onClick={takePicture}>Take Picture</button>
          <div>
            <video ref={videoRef} autoPlay playsInline />
            <canvas ref={canvasRef} style={{ display: "none" }} />
          </div>
        </div>
      )}
    </div>
  );
}
