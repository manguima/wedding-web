"use client";

import { PreviewPhotoDialog } from "@/components/Stories/camera/PreviewPhotoDialog";
import { TakePhotoDialog } from "@/components/Stories/camera/TakePhotoDialog";
import {
  Photo,
  useStockPhoto,
} from "@/components/Stories/camera/useStockPhotoHook";
import { Button, Flex, Grid, Text } from "@mantine/core";

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

      <PreviewPhotoDialog
        onClose={handlePreviewClose}
        open={previewPhotoOpen}
        photo={currentPhoto}
      />
    </Flex>
  );
}

function ActionBar({ onPost }: { onPost: () => void }) {
  return (
    <Flex
      style={{
        position: "fixed",
        zIndex: 1000,
        bottom: 0,
        left: 0,
        right: 0,
        background:
          "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)",
        padding: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Button
        style={{
          color: "#ffde22",
          backgroundColor: "transparent",
          fontSize: "1.2rem",
          borderColor: "#ffde22",
          borderStyle: "solid",
          borderWidth: "2px",
        }}
        onClick={onPost}
      >
        Poste seu momento
      </Button>
    </Flex>
  );
}

function PhotoThumbnail({
  photo,
  onSelect,
}: {
  photo: Photo;
  onSelect: () => void;
}) {
  return (
    <Grid.Col
      span={4}
      key={photo.imageUrl}
      onClick={onSelect}
      style={{
        paddingBottom: "40%",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          backgroundImage: `url(${photo.imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "100%",
          filter: "grayscale(1) blur(5px) ",
          zIndex: 0,
          opacity: 0.2,
          userSelect: "none",
          pointerEvents: "none",
        }}
      />
      <img
        src={photo.imageUrl}
        alt="photo"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "contain",
          zIndex: 1,
          userSelect: "none",
          pointerEvents: "none",
        }}
      />
      <Text
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          zIndex: 2,
          color: "white",
          padding: "5px",
          width: "100%",
          textAlign: "center",
          fontSize: "1.1rem",
          fontWeight: 700,
          userSelect: "none",
          pointerEvents: "none",
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)",
        }}
      >
        {new Date(photo.createdAt).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}{" "}
      </Text>
    </Grid.Col>
  );
}
