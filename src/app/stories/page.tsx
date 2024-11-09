"use client";

import { ActionBar } from "@/components/Stories/ActionBar";
import { PreviewPhotoDialog } from "@/components/Stories/camera/PreviewPhotoDialog";
import { SubmitPhotoDialog } from "@/components/Stories/camera/SubmitPhotoDialog";
import { TakePhotoDialog } from "@/components/Stories/camera/TakePhotoDialog";
import { useStockPhoto } from "@/components/Stories/camera/useStockPhotoHook";
import { GalleryView } from "@/components/Stories/GalleryView";
import { StoriesView } from "@/components/Stories/StoriesView";
import { useState } from "react";

export default function StoriesPage() {
  const {
    cameraDeviceCount,
    canvasRef,
    currentPhoto,
    handleCloseCamera,
    handleDeviceCycle,
    handleOpenPhotoDialog,
    handlePreviewClose,
    handlePreviewPhoto,
    handleTakePicture,
    hasCamera,
    isCameraStarted,
    photos,
    previewPhotoOpen,
    takePhotoOpen,
    videoRef,
    tempSubmitOpen,
    handleGalleryClose,
    handleUploadPhotos,
    tempPhoto,
    isSubmitting,
    codeKey,
    loadMorePhotos,
  } = useStockPhoto();

  const [viewMode, setViewMode] = useState<"gallery" | "stories">("stories");

  function handlePhotoPreview(imageUrl: string) {
    handlePreviewPhoto(imageUrl);
  }

  return (
    <>
      {viewMode === "gallery" && (
        <GalleryView photos={photos} handlePhotoPreview={handlePhotoPreview} />
      )}

      {viewMode === "stories" && (
        <StoriesView photos={photos} handlePhotoPreview={handlePhotoPreview} />
      )}

      <ActionBar
        codeKey={codeKey}
        onPost={() => handleOpenPhotoDialog()}
        onSwitchView={() =>
          setViewMode(viewMode === "gallery" ? "stories" : "gallery")
        }
      />

      <TakePhotoDialog
        cameraDeviceCount={cameraDeviceCount}
        canvasRef={canvasRef}
        hasCamera={!!hasCamera}
        isCameraStarted={isCameraStarted}
        onClose={handleCloseCamera}
        onDeviceCycle={handleDeviceCycle}
        onTakePhoto={handleTakePicture}
        open={takePhotoOpen}
        videoRef={videoRef}
      />

      <SubmitPhotoDialog
        open={tempSubmitOpen}
        onClose={handleGalleryClose}
        onSubmit={handleUploadPhotos}
        photo={tempPhoto}
        isSubmitting={isSubmitting}
      />

      <PreviewPhotoDialog
        onClose={handlePreviewClose}
        open={previewPhotoOpen}
        photo={currentPhoto}
      />

      {/* TODO: Enable CodeKeyModal */}
      {/* <CodeKeyModal saveCodeKey={saveCodeKey} codeKey={codeKey} /> */}
    </>
  );
}
