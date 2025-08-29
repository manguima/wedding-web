"use client";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Button, Flex, Modal, Text } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import useAudio from "@/hooks/useAudio";

export type LayoutInterface = {
  primaryColor: string;
  setPrimaryColor?: Dispatch<SetStateAction<string>>;
  setOffsetKabuki?: Dispatch<SetStateAction<number>>;
  offsetKabuki?: number;
  secondaryColor?: string;
  setSecondaryColor?: Dispatch<SetStateAction<string>>;
  acceptedToPlay?: boolean;
  setAcceptedToPlay: (val: boolean | ((prevState: boolean) => boolean)) => void;
};

export const LayoutContext = createContext<LayoutInterface>({
  primaryColor: "white",
  secondaryColor: "#E5C74D",
  setAcceptedToPlay: () => {},
});

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  // SET COLOR TEXT HEADER MENU
  const [primaryColor, setPrimaryColor] = useState("white");
  const [secondaryColor, setSecondaryColor] = useState("white");

  const [acceptedToPlay, setAcceptedToPlay] = useLocalStorage({
    key: "acceptedToPlay",
    defaultValue: false,
  });
  const [modalToPlay, setModalToPlay] = useLocalStorage({
    key: "modalToPlay",
    defaultValue: true,
  });

  // MUSIC
  const [sound] = useAudio("https://deimatch.com.br/evoce.mp3");

  useEffect(() => {
    if (sound) {
      if (acceptedToPlay) {
        sound?.play();
      } else {
        sound?.stop();
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
                  setAcceptedToPlay(true);
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
                  setAcceptedToPlay(false);
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
