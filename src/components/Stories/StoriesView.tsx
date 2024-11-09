import { Photo } from "@/components/Stories/camera/useStockPhotoHook";
import { PhotoThumbnail } from "@/components/Stories/PhotoThumbnail";
import { Button, Flex, Grid, Text } from "@mantine/core";
import { ScrollArea, Avatar, Box } from "@mantine/core";
import { useRef } from "react";
import useScrollSnap from "react-use-scroll-snap";

export const StoriesView = ({
  photos,
  handlePhotoPreview,
}: {
  photos: Photo[];
  handlePhotoPreview: (imageUrl: string) => void;
}) => {
  const scrollRef = useRef(null);

  const { goto, state } = useScrollSnap({ ref: scrollRef, duration: 100 });

  return (
    <>
      <div
        style={{
          position: "fixed",
          zIndex: 1000,
          top: 10,
          left: 0,
          width: "100%",
          userSelect: "none",
          pointerEvents: "none",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* dots */}
        {photos.map((photo, index) => (
          <div
            key={index}
            style={{
              width: index === state.current?.currentIndex ? 10 : 5,
              height: 2,
              borderRadius: 5,
              background: "white",
              margin: 2,
              opacity: 0.5,
              transition: "opacity 0.2s",
            }}
          />
        ))}
      </div>

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
