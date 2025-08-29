import { Photo } from "@/components/Stories/camera/useStockPhotoHook";
import { PhotoThumbnail } from "@/components/Stories/PhotoThumbnail";
import { Flex, Grid } from "@mantine/core";
import { ScrollArea, Avatar, Box } from "@mantine/core";

export const GalleryView = ({
  photos,
  handlePhotoPreview,
}: {
  photos: Photo[];
  handlePhotoPreview: (imageUrl: string) => void;
}) => {
  return (
    <Flex
      style={{
        paddingBottom: 40,
        minHeight: "100vh",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "start",
      }}
    >
      <ScrollArea
        type="always"
        style={{ width: "100%", padding: "0 1rem" }}
        styles={{
          scrollbar: {
            width: "0",
            height: "0",
          },
        }}
      >
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
          <Grid.Col
            span={{ base: 6, md: 6, lg: 3 }}
            key={photo.imageUrl}
            onClick={() => handlePhotoPreview(photo.imageUrl)}
            style={{
              paddingBottom: "40%",
              position: "relative",
              overflow: "hidden",
              cursor: "pointer",
            }}
          >
            <PhotoThumbnail key={index} photo={photo} />
          </Grid.Col>
        ))}
      </Grid>
    </Flex>
  );
};
