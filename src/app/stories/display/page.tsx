"use client";

import { Photo } from "@/components/Stories/camera/useStockPhotoHook";
import { apiWorker } from "@/zustand/apiWorker";
import { Box, Flex, Image } from "@mantine/core";
import { useEffect, useState } from "react";

// In seconds
const INTERVAL_FOR_IMAGE = 20;

export default function PageDisplay() {
  const [lastImage, setLastImage] = useState<Photo>();
  const [randomImage, setRandomImage] = useState<Photo>();

  // Initial load
  useEffect(() => {
    apiWorker.getStories({
      params: {
        take: 1,
      },
      onSuccess: (data: Photo[]) => {
        setLastImage(data[0]);
      },
    });
  }, []);

  useEffect(() => {
    if (lastImage) {
      const intervalId = setInterval(() => {
        apiWorker.getNextStory({
          params: { id: lastImage.id },
          onSuccess: (data) => {
            if (data) {
              setLastImage(data);
              setRandomImage(undefined);
            }
          },
        });
      }, INTERVAL_FOR_IMAGE * 1000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [lastImage]);

  useEffect(() => {
    const timeoutId = setInterval(() => {
      apiWorker.getRandomStory({
        onSuccess: (data) => {
          setRandomImage(data);
        },
      });
    }, (INTERVAL_FOR_IMAGE + 5) * 1000);

    return () => {
      clearInterval(timeoutId);
    };
  }, [lastImage]);

  return (
    <Flex w="100vw" h="100vh" style={{ overflow: "hidden" }}>
      <Flex
        direction="column"
        w="50%"
        style={{
          borderRight: "10px solid #1c371c",
        }}
      >
        <img
          src={randomImage ? randomImage.imageUrl : lastImage?.imageUrl}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Flex>

      <Box style={{ width: "50%", position: "relative" }}>
        <img
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          src="/images/bg-wedding.jpg"
        />

        <img
          src="/images/logo.svg"
          style={{
            position: "absolute",
            top: "30px",
            left: "30px",
            zIndex: "1",
            height: "110px",
          }}
        />
      </Box>
    </Flex>
  );
}
