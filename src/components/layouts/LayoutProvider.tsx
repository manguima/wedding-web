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
  const soundRef = useRef<Howl | null>(null);
  let sound: Howl | null = null;

  const togglePlay = () => {
    if (soundRef.current) {
      if (isPlaying) {
        soundRef.current.pause();
      } else {
        soundRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const loadSound = () => {
    soundRef.current = new Howl({
      src: ["https://deimatch.com.br/evoce.mp3"],
      onend: () => {
        setIsPlaying(false);
      },
      preload: true,
    });
    // soundRef.current.play(); // Inicia a reprodução automaticamente
    // setIsPlaying(true); // Atualiza o estado para indicar que está reproduzindo
  };

  useEffect(() => {
    if (!soundRef.current) {
      loadSound();
    }
  }, []);

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
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayoutContext = () => useContext(LayoutContext);
