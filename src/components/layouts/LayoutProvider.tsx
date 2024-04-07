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
  sound: Howl | null;
  play: () => void;
  stop: () => void;
  acceptedToPlay?: boolean;
  setAcceptedToPlay?: (
    val: boolean | ((prevState: boolean) => boolean)
  ) => void;
};

export const LayoutContext = createContext<LayoutInterface>({
  primaryColor: "white",
  secondaryColor: "#E5C74D",
  sound: null,
  play: () => {},
  stop: () => {},
});

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  // SET COLOR TEXT HEADER MENU
  const [primaryColor, setPrimaryColor] = useState("white");
  const [secondaryColor, setSecondaryColor] = useState("white");

  const [audioLoaded, setAudioLoaded] = useState(false);
  const [acceptedToPlay, setAcceptedToPlay] = useLocalStorage({
    key: "acceptedToPlay",
    defaultValue: false,
  });
  const [modalToPlay, setModalToPlay] = useLocalStorage({
    key: "modalToPlay",
    defaultValue: true,
  });
  const [sound, setSound] = useState<Howl | null>(null);

  const loadSound = () => {
    if (!audioLoaded) {
      setSound(
        new Howl({
          src: ["https://deimatch.com.br/evoce.mp3"],
          // onend: () => {
          //   setIsPlaying(false);
          // },
          autoplay: acceptedToPlay || false,
          preload: true,
          volume: 0.5,
          loop: true,
        })
      );
      setAudioLoaded(true);
    }
  };

  const play = () => {
    setAcceptedToPlay(true);
  };

  const stop = () => {
    setAcceptedToPlay(false);
  };

  useEffect(() => {
    if (!sound) {
      loadSound();
    }
  }, [sound]);

  useEffect(() => {
    if (sound) {
      if (acceptedToPlay) {
        sound.play();
      } else {
        sound.stop();
      }
    }
  }, [acceptedToPlay, sound]);

  return (
    <LayoutContext.Provider
      value={{
        primaryColor,
        setPrimaryColor,
        secondaryColor,
        setSecondaryColor,
        sound,
        play,
        stop,
        acceptedToPlay,
        setAcceptedToPlay,
      }}
    >
      {!acceptedToPlay && (
        <Modal
          styles={{
            content: { background: "#000" },
          }}
          // title="Iniciar Música"
          withCloseButton={false}
          opened={modalToPlay}
          closeOnClickOutside={false}
          onClose={() => setModalToPlay(false)}
          transitionProps={{ transition: "slide-up" }}
        >
          <Flex gap={"1rem"} direction={"column"}>
            <Text c={"white"} size="lg">
              Você gostaria de ouvir a música?
            </Text>
            <Flex gap={"1rem"}>
              <Button
                c={"#000"}
                color="#F5D759"
                onClick={() => {
                  play();
                  setModalToPlay(false);
                }}
              >
                Sim
              </Button>
              <Button
                c={"white"}
                color="#F5D759"
                variant="transparent"
                onClick={() => {
                  stop();
                  setModalToPlay(false);
                }}
              >
                Não
              </Button>
            </Flex>
          </Flex>
        </Modal>
      )}
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayoutContext = () => useContext(LayoutContext);
