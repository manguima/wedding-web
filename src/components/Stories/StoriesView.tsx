import { Photo } from "@/components/Stories/camera/useStockPhotoHook";
import { PhotoThumbnail } from "@/components/Stories/PhotoThumbnail";
import { Flex, Progress, Switch } from "@mantine/core";
import { Box } from "@mantine/core";
import { useEffect, useRef, useState } from "react";

export const StoriesView = ({
  photos,
  handlePhotoPreview,
  reloadPhotos,
}: {
  photos: Photo[];
  handlePhotoPreview: (imageUrl: string) => void;
  reloadPhotos: () => void;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!autoScroll) return;

    let interval: NodeJS.Timeout;

    const resetInterval = () => {
      setProgress(0);
      clearInterval(interval);
      startInterval();
    };

    const startInterval = () => {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            if (containerRef.current) {
              const currentScroll = containerRef.current.scrollTop;
              const maxScroll =
                containerRef.current.scrollHeight -
                containerRef.current.clientHeight;

              const nextIndex = Math.ceil(currentScroll / window.innerHeight);
              const nextScrollTop = (nextIndex + 1) * window.innerHeight;

              if (nextScrollTop >= containerRef.current.scrollHeight) {
                reloadPhotos(); // Reload photos if at the last scroll position
              }

              containerRef.current.scrollTo({
                top:
                  nextScrollTop >= containerRef.current.scrollHeight
                    ? 0
                    : nextScrollTop,
                behavior: "smooth",
              });
            }
            return 0;
          }
          return prev + 1;
        });
      }, 50);
    };

    startInterval();

    containerRef.current?.addEventListener("scroll", resetInterval);
    containerRef.current?.addEventListener("click", resetInterval);

    return () => {
      clearInterval(interval);
      containerRef.current?.removeEventListener("scroll", resetInterval);
      containerRef.current?.removeEventListener("click", resetInterval);
    };
  }, [autoScroll, reloadPhotos]);

  return (
    <>
      {autoScroll && (
        <div
          style={{
            position: "fixed",
            zIndex: 1000,
            top: 0,
            left: 0,
            width: "100%",
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          <Progress
            value={progress}
            size="xs"
            color="#ffde22"
            style={{
              backgroundColor: "transparent",
            }}
          />
        </div>
      )}

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
          pointerEvents: "none",
        }}
      >
        <Switch
          label="Auto scroll"
          checked={autoScroll}
          onChange={() => setAutoScroll((prev) => !prev)}
          color="yellow"
          size="lg"
          style={{ color: "white", userSelect: "none", pointerEvents: "all" }}
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
            <PhotoThumbnail photo={photo} showDate={false} />
          </Box>
        ))}
      </main>
    </>
  );
};
