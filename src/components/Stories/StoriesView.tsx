import { Photo } from "@/components/Stories/camera/useStockPhotoHook";
import { PhotoThumbnail } from "@/components/Stories/PhotoThumbnail";
import { Button, Flex, Grid, Switch, Text } from "@mantine/core";
import { ScrollArea, Avatar, Box } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import useScrollSnap from "react-use-scroll-snap";

export const StoriesView = ({
  photos,
  handlePhotoPreview,
}: {
  photos: Photo[];
  handlePhotoPreview: (imageUrl: string) => void;
}) => {
  const scrollRef = useRef(null);

  const { goto: goTo, state } = useScrollSnap({
    ref: scrollRef,
    duration: 100,
  });

  const [autoScroll, setAutoScroll] = useState(true);
  const [dotIndex, setDotIndex] = useState(0);

  // interval scrolling to the next photo every 1 seconds
  useEffect(() => {
    if (!autoScroll) return;
    const interval = setInterval(() => {
      goTo((state.current?.currentIndex || 0) + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, [state.current?.currentIndex, autoScroll]);

  useEffect(() => {
    setDotIndex(state.current?.currentIndex || 0);
  }, [state]);

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

      <main ref={scrollRef} style={{ background: "black" }}>
        {photos.map((photo, index) => (
          <Section>
            <PhotoThumbnail
              key={index}
              photo={photo}
              onSelect={() => handlePhotoPreview(photo.imageUrl)}
              showDate={false}
            />
          </Section>
        ))}
      </main>
    </>
  );
};

interface SectionProps {
  children: React.ReactNode;
}

function Section({ children }: SectionProps) {
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
        position: "relative",
      }}
    >
      {children}
    </Box>
  );
}
