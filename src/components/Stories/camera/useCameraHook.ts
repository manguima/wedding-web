import { useEffect, useState, useRef } from "react";

export function useCamera() {
  const [hasCamera, setHasCamera] = useState<boolean>(false);
  const [deviceCount, setDeviceCount] = useState<number>(0);

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
    const device = (await getVideoDevices())[index];
    cameraRef.current = await getVideoStream(device);
    setIsStarted(true);

    return cameraRef.current;
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
}
