"use client";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Howl } from "howler";
import { Button, Flex, Modal, Text } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";

export type LayoutInterface = {
  primaryColor: string;
  setPrimaryColor?: Dispatch<SetStateAction<string>>;
  setOffsetKabuki?: Dispatch<SetStateAction<number>>;
  offsetKabuki?: number;
  secondaryColor?: string;
  setSecondaryColor?: Dispatch<SetStateAction<string>>;
  togglePlay?: () => void;
  isPlaying: boolean;
};

export const LayoutContext = createContext<LayoutInterface>({
  primaryColor: "white",
  secondaryColor: "#E5C74D",
  isPlaying: true,
});

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  // SET COLOR TEXT HEADER MENU
  const [primaryColor, setPrimaryColor] = useState("white");
  const [secondaryColor, setSecondaryColor] = useState("white");

  const [isPlaying, setIsPlaying] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const [acceptedToPlay, setAcceptedToPlay] = useLocalStorage({
    key: "acceptedToPlay",
    defaultValue: true,
  });
  let sound: Howl | null = null;

  const togglePlay = () => {
    if (sound) {
      if (isPlaying) {
        sound.pause();
      } else {
        sound.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const play = () => {
    if (sound) {
      sound.play();
    }
  };

  const stop = () => {
    if (sound) {
      sound.pause();
    }
  };

  const loadSound = () => {
    if (!audioLoaded) {
      sound = new Howl({
        src: ["https://deimatch.com.br/evoce.mp3"],
        onend: () => {
          setIsPlaying(false);
        },
        preload: true,
      });
      setAudioLoaded(true);
    }
  };

  // const handleAccept = () => {
  //   setAcceptedToPlay(true);
  // };

  useEffect(() => {
    if (acceptedToPlay) {
      if (!sound) {
        loadSound();
        play();
      }
    }
  }, [acceptedToPlay]);

  return (
    <LayoutContext.Provider
      value={{
        primaryColor,
        setPrimaryColor,
        secondaryColor,
        setSecondaryColor,
        togglePlay,
        isPlaying,
      }}
    >
      {/* {!acceptedToPlay && (
        <Modal
          styles={{
            content: {},
          }}
          // title="Iniciar Música"
          withCloseButton={false}
          opened={!acceptedToPlay}
          onClose={() => setAcceptedToPlay(true)}
          transitionProps={{ transition: "slide-up" }}
        >
          <Flex direction={"column"}>
            <Text size="lg">Você gostaria de ouvir a música?</Text>
            <Button onClick={handleAccept}>Sim</Button>
            <Button onClick={handleAccept}>Não</Button>
          </Flex>
        </Modal>
      )} */}
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayoutContext = () => useContext(LayoutContext);
