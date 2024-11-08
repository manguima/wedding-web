"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { apiWorker } from "@/zustand/apiWorker";
import { useLocalStorage } from "@mantine/hooks";

const allowedPhotoFormats = ["image/jpeg", "image/png"];
const maxPhotoFiles = 1;

export interface Photo {
  imageUrl: string;
  createdAt: string;
}

export function useStockPhoto() {
  const [hasCamera, setHasCamera] = useState<boolean>(false);
  const [deviceCount, setDeviceCount] = useState<number>(0);
  const [tempPhoto, setTempPhoto] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const cameraRef = useRef<MediaStream | null>(null);

  async function getVideoDevices(): Promise<MediaDeviceInfo[]> {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.filter((device) => device.kind === "videoinput");
  }

  async function getVideoStream(device: MediaDeviceInfo): Promise<MediaStream> {
    const constraints = { video: { deviceId: device.deviceId } };
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    return stream;
  }

  useEffect(() => {
    async function checkCameraAvailability() {
      try {
        const devices = await getVideoDevices();
        setDeviceCount(devices.length);

        setHasCamera(devices.length > 0);
      } catch (error) {
        setHasCamera(false);
        setDeviceCount(0);
      }
    }

    checkCameraAvailability();
    return () => {
      stopCamera();
    };
  }, []);

  async function changeDevice(index: number) {
    if (index >= 0 && index < deviceCount) {
      const device = (await getVideoDevices())[index];
      cameraRef.current = await getVideoStream(device);
      setIsStarted(true);

      return cameraRef.current;
    }
    return null;
  }

  async function stopCamera() {
    if (cameraRef.current) {
      cameraRef.current.getTracks().forEach((track) => {
        track.stop();
      });
      cameraRef.current = null;
      setIsStarted(false);
    }
  }

  const [photos, setPhotos] = useState<Photo[]>([]);
  const [takePhotoOpen, setTakePhotoOpen] = useState(false);
  const [previewPhotoOpen, setPreviewPhotoOpen] = useState(false);
  const [tempSubmitOpen, setTempSubmitOpen] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState<string>("");
  const defaultDevice = 0;

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [deviceIndex, setDeviceIndex] = useState<number>();

  function getPhotos(): Promise<Photo[]> {
    return new Promise((resolve, reject) =>
      apiWorker.getStories({
        onSuccess: (response) => resolve(response),
        onError: (error) => reject(error),
      })
    );
  }

  function reloadPhotos() {
    setTimeout(() => {
      getPhotos().then((response) => setPhotos(response));
    }, 1000);
  }

  useEffect(() => {
    getPhotos().then((response) => setPhotos(response));
  }, []);

  const handleStartCamera = useCallback(async () => {
    if (!videoRef.current) return;
    videoRef.current.srcObject = await changeDevice(
      deviceIndex === undefined ? defaultDevice : deviceIndex
    );
  }, [changeDevice, deviceIndex, defaultDevice]);

  useEffect(() => {
    handleStartCamera();

    return () => {
      stopCamera();
    };
    // The camera should only be started once, otherwise it will loop infinite rendering
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deviceIndex]);

  function handleDeviceCycle() {
    setDeviceIndex((prev) =>
      prev === undefined ? 0 : (prev + 1) % deviceCount
    );
  }

  const [codeKey, setCodeKey] = useLocalStorage<string | null>({
    key: "codeKey",
    defaultValue: null,
  });

  function saveCodeKey(_codeKey: string) {
    return new Promise<void>((resolve, reject) => {
      apiWorker.validateCodeKey({
        data: { codeKey },
        onSuccess: (response) => {
          setCodeKey(_codeKey);
          resolve();
        },
        onError: (error) => {
          setCodeKey(null);
          reject();
        },
      });
    });
  }

  const handleUploadPhotos = useCallback(async () => {
    setIsSubmitting(true);
    return apiWorker.saveStory({
      data: { file: tempPhoto, codeKey: codeKey },
      onSuccess: (response) => {
        handleGalleryClose();
      },
      onError: (error) => {
        handleGalleryClose();
      },
    });
  }, [tempPhoto]);

  function handleOpenPhotoDialog() {
    setTempSubmitOpen(false);
    if (hasCamera) {
      handleStartCamera();
      setTakePhotoOpen(true);
    } else {
      handleAddPhotos();
    }
  }

  function handleAddPhotos() {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = allowedPhotoFormats.join(", ");
    fileInput.multiple = true;

    fileInput.addEventListener("change", (event) => {
      let files: File[] = Array.from((event.target as HTMLInputElement).files!);
      files = files.filter((file) => allowedPhotoFormats.includes(file.type));

      const maxIterations = Math.min(maxPhotoFiles, files.length);

      for (let i = 0; i < maxIterations; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = () => {
          setTempPhoto(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
      setTempSubmitOpen(true);
    });
    fileInput.click();
  }

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

    hasCamera,
    isCameraStarted: isStarted,
    cameraDeviceCount: deviceCount,
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
