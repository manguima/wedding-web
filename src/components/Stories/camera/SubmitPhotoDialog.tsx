import { Button } from "@mantine/core";
import { CameraModal } from "./CameraModal";
import { useEffect } from "react";

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
      actionButtons={
        <>
          <Button
            size="large"
            onClick={onSubmit}
            disabled={isSubmitting}
            style={{
              color: "#ffde22",
              backgroundColor: "transparent",
              borderColor: "#ffde22",
              borderStyle: "solid",
              borderWidth: "2px",
            }}
          >
            {isSubmitting ? "Enviando..." : "Enviar Foto"}
          </Button>

          <Button
            size="large"
            onClick={onClose}
            disabled={isSubmitting}
            style={{
              color: "#ffde22",
              backgroundColor: "transparent",
              borderColor: "#ffde22",
              borderStyle: "solid",
              borderWidth: "2px",
            }}
          >
            Cancelar
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
    </CameraModal>
  );
}
