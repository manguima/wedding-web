import { Photo } from "@/components/Stories/camera/useStockPhotoHook";
import { PhotoThumbnail } from "@/components/Stories/PhotoThumbnail";
import { Flex, Switch } from "@mantine/core";
import { Box } from "@mantine/core";
import { useEffect, useRef, useState } from "react";

export const StoriesView = ({
  photos,
  handlePhotoPreview,
}: {
  photos: Photo[];
  handlePhotoPreview: (imageUrl: string) => void;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);

  useEffect(() => {
    if (!autoScroll) return;

    const interval = setInterval(() => {
      if (containerRef.current) {
        const currentScroll = containerRef.current.scrollTop;
        const nextIndex = Math.ceil(currentScroll / window.innerHeight);
        const nextScrollTop = (nextIndex + 1) * window.innerHeight;

        containerRef.current.scrollTo({
          top:
            nextScrollTop >= containerRef.current.scrollHeight
              ? 0
              : nextScrollTop,
          behavior: "smooth",
        });
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [autoScroll]);

  return (
    <>
      <Flex
        style={{
          position: "fixed",
          zIndex: 1000,
          top: 10,
          right: 10,
          userSelect: "none",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Switch
          label="Auto scroll"
          checked={autoScroll}
          onChange={() => setAutoScroll((prev) => !prev)}
          color="yellow"
          size="lg"
          style={{ userSelect: "none", color: "white" }}
        />
      </Flex>

      <main
        ref={containerRef}
        style={{
          scrollSnapType: "y mandatory",
          overflowY: "scroll",
          height: "100vh",
          backgroundColor: "black",
        }}
      >
        {photos.map((photo, index) => (
          <Box
            key={index}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              width: "100%",
              position: "relative",
              scrollSnapAlign: "start",
            }}
          >
            <PhotoThumbnail
              photo={photo}
              onSelect={() => handlePhotoPreview(photo.imageUrl)}
              showDate={false}
            />
          </Box>
        ))}
      </main>
    </>
  );
};
