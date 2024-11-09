import { ActionIcon, Button, Loader } from "@mantine/core";
import { CameraModal } from "./CameraModal";
import { useEffect } from "react";
import { IconX } from "@tabler/icons-react";

interface SubmitPhotoDialogProps {
  open: boolean;
  onClose: () => void;
  photo: string;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export function SubmitPhotoDialog({
  open,
  photo,
  onClose,
  onSubmit,
  isSubmitting,
}: SubmitPhotoDialogProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, open]);

  return (
    <CameraModal
      open={open}
      closeButton={
        <ActionIcon
          size="xl"
          radius="xl"
          onClick={onClose}
          style={{
            color: "#E0C862",
            backgroundColor: "transparent",
            borderColor: "#E0C862",
            borderStyle: "solid",
            borderWidth: "2px",

            position: "absolute",
            top: "10px",
            right: "10px",
          }}
        >
          <IconX />
        </ActionIcon>
      }
      actionButtons={
        <>
          <Button
            size="lg"
            onClick={onSubmit}
            disabled={isSubmitting}
            style={{
              color: "#E0C862",
              backgroundColor: "transparent",
              borderColor: "#E0C862",
              borderStyle: "solid",
              borderWidth: "2px",
            }}
          >
            {isSubmitting ? "Enviando..." : "Enviar Foto"}
          </Button>
        </>
      }
    >
      {photo && (
        <img
          src={photo}
          alt="Preview"
          style={{ width: "100%", opacity: isSubmitting ? 0.5 : 1 }}
        />
      )}

      {isSubmitting && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            userSelect: "none",
            pointerEvents: "none",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loader color="#E0C862" size={50} />
        </div>
      )}
    </CameraModal>
  );
}
