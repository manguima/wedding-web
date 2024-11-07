"use client";

import { ActionBar } from "@/components/Stories/ActionBar";
import { PreviewPhotoDialog } from "@/components/Stories/camera/PreviewPhotoDialog";
import { SubmitPhotoDialog } from "@/components/Stories/camera/SubmitPhotoDialog";
import { TakePhotoDialog } from "@/components/Stories/camera/TakePhotoDialog";
import { useStockPhoto } from "@/components/Stories/camera/useStockPhotoHook";
import { CodeKeyModal } from "@/components/Stories/CodeKeyModal";
import { PhotoThumbnail } from "@/components/Stories/PhotoThumbnail";
import { Flex, Grid } from "@mantine/core";

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
    saveCodeKey,
    tempSubmitOpen,
    handleGalleryClose,
    handleUploadPhotos,
    tempPhoto,
    isSubmitting,
    codeKey,
  } = useStockPhoto();

  function handlePhotoPreview(imageUrl: string) {
    handlePreviewPhoto(imageUrl);
  }

  return (
    <Flex
      style={{
        backgroundColor: "black",
        paddingBottom: 40,
        minHeight: "100vh",
      }}
    >
      <Grid w="100%">
        {photos.map((photo, index) => (
          <PhotoThumbnail
            key={index}
            photo={photo}
            onSelect={() => handlePhotoPreview(photo.imageUrl)}
          />
        ))}
      </Grid>

      <ActionBar onPost={() => handleOpenPhotoDialog()} />

      <TakePhotoDialog
        cameraDeviceCount={cameraDeviceCount}
        canvasRef={canvasRef}
        hasCamera={hasCamera}
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
      <CodeKeyModal saveCodeKey={saveCodeKey} codeKey={codeKey} />
    </Flex>
  );
}
