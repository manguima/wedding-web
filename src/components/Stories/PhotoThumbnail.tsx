import { Photo } from "@/components/Stories/camera/useStockPhotoHook";
import { Grid, Text } from "@mantine/core";

export function PhotoThumbnail({
  photo,
  onSelect,
}: {
  photo: Photo;
  onSelect: () => void;
}) {
  return (
    <Grid.Col
      span={{ base: 6, md: 6, lg: 3 }}
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
