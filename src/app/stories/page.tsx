"use client";

import { ActionBar } from "@/components/Stories/ActionBar";
import { PreviewPhotoDialog } from "@/components/Stories/camera/PreviewPhotoDialog";
import { SubmitPhotoDialog } from "@/components/Stories/camera/SubmitPhotoDialog";
import { TakePhotoDialog } from "@/components/Stories/camera/TakePhotoDialog";
import { useStockPhoto } from "@/components/Stories/camera/useStockPhotoHook";
import { PhotoThumbnail } from "@/components/Stories/PhotoThumbnail";
import { Flex, Grid } from "@mantine/core";
import { ScrollArea, Avatar, Box, Stack, Text } from "@mantine/core";

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
        paddingBottom: 40,
        minHeight: "100vh",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ScrollArea type="always" style={{ width: "100%", padding: "0 1rem" }}>
        <Box style={{ display: "flex", gap: "1rem", padding: "1rem 0" }}>
          {photos.map((_, index) => (
            <Avatar
              radius="xl"
              size={70}
              key={index}
              src={photos[index].imageUrl}
              alt={`Story ${index + 1}`}
              onClick={() => handlePhotoPreview(photos[index].imageUrl)}
              style={{
                cursor: "pointer",
                borderRadius: "50%",

                borderStyle: "solid",
                borderWidth: "2px",
                borderColor: "white",

                boxShadow: "0 0 0 2px #ffde22",
              }}
            />
          ))}
        </Box>
      </ScrollArea>

      <Grid w="100%">
        {photos.map((photo, index) => (
          <PhotoThumbnail
            key={index}
            photo={photo}
            onSelect={() => handlePhotoPreview(photo.imageUrl)}
          />
        ))}
      </Grid>

      <ActionBar codeKey={codeKey} onPost={() => handleOpenPhotoDialog()} />

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
    </Flex>
  );
}
