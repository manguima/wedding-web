"use client";

import { ActionIcon, Button, Loader, Text } from "@mantine/core";
import { CameraModal } from "./CameraModal";
import { useEffect, useState } from "react";
import { IconArrowBack, IconCameraRotate } from "@tabler/icons-react";

interface TakePhotoDialogProps {
  open: boolean;
  onClose: () => void;
  onTakePhoto: () => void;
  onDeviceCycle: () => void;
  hasCamera: boolean;
  isCameraStarted: boolean;
  cameraDeviceCount: number;
  videoRef: React.RefObject<HTMLVideoElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

export function TakePhotoDialog({
  open,
  onClose,
  onTakePhoto,
  onDeviceCycle,
  hasCamera,
  isCameraStarted,
  cameraDeviceCount,
  videoRef,
  canvasRef,
}: TakePhotoDialogProps) {
  const [lateStart, setLateStart] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (open && !isCameraStarted && !lateStart) {
        setLateStart(true);
        onDeviceCycle();
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, [open, isCameraStarted, lateStart, onDeviceCycle]);

  return (
    <CameraModal
      open={open}
      actionButtons={
        <>
          <ActionIcon
            size="xl"
            radius="xl"
            onClick={onClose}
            color="#000"
            style={{
              color: "white",
            }}
          >
            <IconArrowBack />
          </ActionIcon>

          {hasCamera && (
            <>
              {isCameraStarted && (
                <div
                  style={{
                    backgroundColor: "white",
                    padding: "5px",
                    borderRadius: "50%",
                  }}
                  onClick={onTakePhoto}
                >
                  <div
                    style={{
                      backgroundColor: "white",
                      border: "3px solid black",
                      borderRadius: "50%",
                      padding: "20px",
                    }}
                  ></div>
                </div>
              )}

              <ActionIcon
                size="xl"
                radius="xl"
                onClick={onDeviceCycle}
                title={cameraDeviceCount.toString()}
                color="#000"
                style={{
                  color: "white",
                }}
              >
                <IconCameraRotate />
              </ActionIcon>
            </>
          )}
        </>
      }
    >
      {!isCameraStarted && (
        <>
          <Loader color="#E0C862" />
          {lateStart && (
            <Button
              size="small"
              onClick={onDeviceCycle}
              color="#E0C862"
              style={{
                color: "#191F10",
                marginTop: "1rem",
              }}
            >
              Tentar novamente
            </Button>
          )}
        </>
      )}

      {!hasCamera && <Text>Nenhuma câmera encontrada</Text>}

      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{
          display: isCameraStarted ? "block" : "none",
          objectFit: "cover",
          height: "100%",
          width: "100%",
        }}
      />

      <canvas
        ref={canvasRef}
        width={1280}
        height={720}
        style={{
          display: "none",
        }}
      />
    </CameraModal>
  );
}
