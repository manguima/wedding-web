"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { apiWorker } from "@/zustand/apiWorker";
import { useLocalStorage } from "@mantine/hooks";
import useCamera from "./useCameraHook";

const allowedPhotoFormats = ["image/jpeg", "image/png"];
const maxPhotoFiles = 1;

export interface Photo {
  imageUrl: string;
  createdAt: string;
}

export function useStockPhoto() {
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
  const handleDeviceCycle = () => {
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

  // ------------------------------

  const [photos, setPhotos] = useState<Photo[]>([]);
  const [takePhotoOpen, setTakePhotoOpen] = useState(false);
  const [previewPhotoOpen, setPreviewPhotoOpen] = useState(false);
  const [tempSubmitOpen, setTempSubmitOpen] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState<string>("");
  const [tempPhoto, setTempPhoto] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getPhotos = (): Promise<Photo[]> => {
    return new Promise((resolve, reject) =>
      apiWorker.getStories({
        onSuccess: (response) => resolve(response),
        onError: (error) => reject(error),
      })
    );
  };

  const reloadPhotos = () => {
    setTimeout(() => {
      getPhotos().then((response) => setPhotos(response));
    }, 1000);
  };

  useEffect(() => {
    getPhotos().then((response) => setPhotos(response));
  }, []);

  const [codeKey, setCodeKey] = useLocalStorage<string | null>({
    key: "codeKey",
    defaultValue: null,
  });

  function saveCodeKey(_codeKey: string) {
    return new Promise<void>((resolve, reject) => {
      apiWorker.validateCodeKey({
        data: { codeKey: _codeKey },
        onSuccess: () => {
          setCodeKey(_codeKey);
          resolve();
        },
        onError: () => {
          setCodeKey(null);
          reject();
        },
      });
    });
  }

  const handleUploadPhotos = useCallback(async () => {
    setIsSubmitting(true);
    return apiWorker.saveStory({
      data: { file: tempPhoto, codeKey },
      onSuccess: handleGalleryClose,
      onError: handleGalleryClose,
    });
  }, [tempPhoto]);

  function handleOpenPhotoDialog() {
    setTempSubmitOpen(false);
    // if (hasCamera) {
    startCamera();
    setTakePhotoOpen(true);
    // } else {
    //   handleAddPhotos();
    // }
  }

  // function handleAddPhotos() {
  //   const fileInput = document.createElement("input");
  //   fileInput.type = "file";
  //   fileInput.accept = allowedPhotoFormats.join(", ");
  //   fileInput.multiple = true;

  //   fileInput.addEventListener("change", (event) => {
  //     let files: File[] = Array.from((event.target as HTMLInputElement).files!);
  //     files = files.filter((file) => allowedPhotoFormats.includes(file.type));

  //     const maxIterations = Math.min(maxPhotoFiles, files.length);

  //     for (let i = 0; i < maxIterations; i++) {
  //       const file = files[i];
  //       const reader = new FileReader();
  //       reader.onload = () => {
  //         setTempPhoto(reader.result as string);
  //       };
  //       reader.readAsDataURL(file);
  //     }
  //     setTempSubmitOpen(true);
  //   });
  //   fileInput.click();
  // }

  function handleTakePicture() {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (video && canvas) {
      const context = canvas.getContext("2d");
      if (!context) return;

      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      canvas.width = videoWidth;
      canvas.height = videoHeight;

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "black";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const dataURL = canvas.toDataURL("image/png");
      setTempPhoto(dataURL);

      handleCloseCamera();
    }

    setTempSubmitOpen(true);
  }

  function handleCloseCamera() {
    setTakePhotoOpen(false);
    stopCamera();
    if (tempPhoto) {
      setTempSubmitOpen(true);
    }
  }

  function handlePreviewPhoto(photo: string) {
    setTempSubmitOpen(false);
    setCurrentPhoto(photo);
    setPreviewPhotoOpen(true);
  }

  function handlePreviewClose() {
    setPreviewPhotoOpen(false);
    setCurrentPhoto("");
  }

  function handleGalleryClose() {
    setIsSubmitting(false);
    setTempSubmitOpen(false);
    setCurrentPhoto("");
    setTempPhoto("");
    reloadPhotos();
  }

  return {
    handleUploadPhotos,
    handleOpenPhotoDialog,

    takePhotoOpen,
    handleTakePicture,
    handleDeviceCycle,
    handleCloseCamera,

    videoRef,
    canvasRef,

    previewPhotoOpen,
    currentPhoto,
    handlePreviewPhoto,
    handlePreviewClose,

    tempSubmitOpen,
    handleGalleryClose,
    photos,

    saveCodeKey,
    codeKey,

    tempPhoto,
    isSubmitting,
  };
}
