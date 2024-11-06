import { Button } from "@mantine/core";
import { CameraModal } from "./CameraModal";
import { IconCheck } from "@tabler/icons-react";
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
      actionButtons={
        <>
          <Button size="large" onClick={onClose} style={{ color: "white" }}>
            <IconCheck />
          </Button>
        </>
      }
    >
      {photo && <img src={photo} alt="Preview" style={{ width: "100%" }} />}
    </CameraModal>
  );
}
