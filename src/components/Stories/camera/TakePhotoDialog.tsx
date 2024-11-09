"use client";

import { Button, Loader, Text } from "@mantine/core";
import { CameraModal } from "./CameraModal";
import { useEffect, useState } from "react";
import { IconArrowBack, IconCameraRotate } from "@tabler/icons-react";

interface TakePhotoDialogProps {
  open: boolean;
  onClose: () => void;
  onTakePhoto: () => void;
  onDeviceCycle: () => void;
  videoRef: React.RefObject<HTMLVideoElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

export function TakePhotoDialog({
  open,
  onClose,
  onTakePhoto,
  onDeviceCycle,
  videoRef,
  canvasRef,
}: TakePhotoDialogProps) {
  const [lateStart, setLateStart] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (open && !lateStart) {
        setLateStart(true);
        onDeviceCycle();
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, [open, lateStart, onDeviceCycle]);

  return (
    <CameraModal
      open={open}
      actionButtons={
        <>
          <Button
            size="large"
            onClick={onClose}
            style={{
              color: "#ffde22",
              backgroundColor: "transparent",
              borderColor: "#ffde22",
              borderStyle: "solid",
              borderWidth: "2px",
            }}
          >
            <IconArrowBack />
          </Button>

          <>
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

            <Button
              size="large"
              onClick={onDeviceCycle}
              style={{
                color: "#ffde22",
                backgroundColor: "transparent",
                borderColor: "#ffde22",
                borderStyle: "solid",
                borderWidth: "2px",
              }}
            >
              <IconCameraRotate />
            </Button>
          </>
        </>
      }
    >
      <>
        <Loader />
        {lateStart && (
          <Button size="small" onClick={onDeviceCycle}>
            Tentar novamente
          </Button>
        )}
      </>

      <video
        ref={videoRef}
        autoPlay
        style={{
          display: "block",
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
