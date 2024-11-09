import { ActionIcon, Button } from "@mantine/core";
import { CameraModal } from "./CameraModal";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useEffect } from "react";

interface PreviewPhotoDialogProps {
  open: boolean;
  onClose: () => void;
  photo: string;
}

export function PreviewPhotoDialog({
  open,
  photo,
  onClose,
}: PreviewPhotoDialogProps) {
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
      actionButtons={<></>}
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

            position: "fixed",
            top: "10px",
            right: "10px",
          }}
        >
          <IconX />
        </ActionIcon>
      }
    >
      {photo && <img src={photo} alt="Preview" style={{ width: "100%" }} />}
    </CameraModal>
  );
}
