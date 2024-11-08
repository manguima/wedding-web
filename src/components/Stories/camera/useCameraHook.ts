import { useState, useRef, useEffect } from "react";

interface UseCameraReturn {
  hasCamera: boolean | null;
  deviceCount: number;
  cameraRef: React.RefObject<HTMLVideoElement>;
  changeDevice: () => void;
  stopCamera: () => void;
  getVideoDevices: () => Promise<MediaDeviceInfo[]>;
  getVideoStream: () => Promise<void>;
  isStarted: boolean;
}

const useCamera = (): UseCameraReturn => {
  const [hasCamera, setHasCamera] = useState<boolean | null>(null);
  const [deviceCount, setDeviceCount] = useState<number>(0);
  const [currentDeviceIndex, setCurrentDeviceIndex] = useState<number>(0);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const cameraRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Fetch available video input devices (cameras)
  const getVideoDevices = async (): Promise<MediaDeviceInfo[]> => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter(
      (device) => device.kind === "videoinput"
    );
    setDeviceCount(videoDevices.length);
    return videoDevices;
  };

  // Start camera feed with the selected device
  const getVideoStream = async () => {
    try {
      const videoDevices = await getVideoDevices();
      if (videoDevices.length === 0) {
        setHasCamera(false);
        console.error("No camera devices found.");
        return;
      }

      const selectedDeviceId =
        videoDevices[currentDeviceIndex % videoDevices.length].deviceId;
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: selectedDeviceId },
      });

      streamRef.current = mediaStream;
      setHasCamera(true);
      setIsStarted(true);

      if (cameraRef.current) {
        cameraRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      setHasCamera(false);
    }
  };

  // Stop the camera feed
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsStarted(false);
  };

  // Change to the next video device (camera)
  const changeDevice = () => {
    stopCamera();
    setCurrentDeviceIndex((prevIndex) => prevIndex + 1);
  };

  // Restart camera feed when device index changes
  useEffect(() => {
    if (isStarted) {
      getVideoStream();
    }
    return () => stopCamera();
  }, [currentDeviceIndex]);

  return {
    hasCamera,
    deviceCount,
    cameraRef,
    changeDevice,
    stopCamera,
    getVideoDevices,
    getVideoStream,
    isStarted,
  };
};

export default useCamera;
