import { useEffect, useState, useRef } from "react";

export function useCamera() {
  const [hasCamera, setHasCamera] = useState<boolean>(false);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const cameraRef = useRef<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [index, setIndex] = useState<number>(0);

  // Filter out non-video input devices (e.g., microphones, speakers)
  const getVideoDevices = async (): Promise<MediaDeviceInfo[]> =>
    (await navigator.mediaDevices.enumerateDevices()).filter((device) => {
      return device.kind === "videoinput" && device.label !== "";
    });

  const getVideoStream = async (deviceId: string): Promise<MediaStream> =>
    await navigator.mediaDevices.getUserMedia({
      video: { deviceId },
    });

  useEffect(() => {
    const checkCameraAvailability = async () => {
      const devices = await getVideoDevices();
      setHasCamera(devices.length > 0);
    };

    checkCameraAvailability();
    return stopCamera;
  }, []);

  const startCamera = async () => {
    const devices = await getVideoDevices();
    const nextIndex = index >= devices.length ? 0 : index;
    const device = devices[nextIndex];
    setIndex(nextIndex + 1);
    cameraRef.current = await getVideoStream(device.deviceId);
    videoRef.current!.srcObject = cameraRef.current;
    setIsStarted(true);
  };

  const stopCamera = () => {
    if (cameraRef.current) {
      cameraRef.current.getTracks().forEach((track) => track.stop());
      cameraRef.current = null;
      setIsStarted(false);
    }
  };

  const changeDevice = async () => {
    if (cameraRef.current) {
      stopCamera();
    }
    await startCamera();
  };

  return {
    hasCamera,
    cameraRef,
    changeDevice,
    stopCamera,
    isStarted,
    videoRef,
  };
}
