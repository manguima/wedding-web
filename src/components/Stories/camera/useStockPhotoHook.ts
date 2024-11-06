import { useCallback, useEffect, useRef, useState } from "react";
import { useCamera } from "./useCameraHook";
import { apiWorker } from "@/zustand/apiWorker";

const allowedPhotoFormats = ["image/jpeg", "image/png"];
const maxPhotoFiles = 10;

export interface Photo {
  imageUrl: string;
  createdAt: string;
}

export function useStockPhoto() {
  const { hasCamera, deviceCount, changeDevice, stopCamera, isStarted } =
    useCamera();

  const [photos, setPhotos] = useState<Photo[]>([]);
  const [takePhotoOpen, setTakePhotoOpen] = useState(false);
  const [previewPhotoOpen, setPreviewPhotoOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
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

  const handleUploadPhotos = useCallback(async (photo: string) => {
    return apiWorker.saveStory({
      data: { file: photo, codeKey: "AAAA" },
      onSuccess: (response) => {
        handleGalleryClose();
      },
      onError: (error) => {
        handleGalleryClose();
      },
    });
  }, []);

  function handleOpenPhotoDialog() {
    setGalleryOpen(false);
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
          handleUploadPhotos(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
      setGalleryOpen(true);
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
      handleUploadPhotos(dataURL);

      handleCloseCamera();
    }

    setGalleryOpen(true);
  }

  function handleCloseCamera() {
    setTakePhotoOpen(false);
    stopCamera();
    if (photos && photos.length > 0) {
      setGalleryOpen(true);
    }
  }

  function handlePreviewPhoto(photo: string) {
    setGalleryOpen(false);
    setCurrentPhoto(photo);
    setPreviewPhotoOpen(true);
  }

  function handlePreviewClose() {
    setGalleryOpen(true);
    setPreviewPhotoOpen(false);
    setCurrentPhoto("");
  }

  function handleGalleryClose() {
    setGalleryOpen(false);
    setCurrentPhoto("");
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

    galleryOpen,
    handleGalleryClose,
    photos,
  };
}
