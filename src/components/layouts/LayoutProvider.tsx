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

import ReactAudioPlayer from "react-audio-player";

export type LayoutInterface = {
  primaryColor: string;
  setPrimaryColor?: Dispatch<SetStateAction<string>>;
  setOffsetKabuki?: Dispatch<SetStateAction<number>>;
  offsetKabuki?: number;
  secondaryColor?: string;
  setSecondaryColor?: Dispatch<SetStateAction<string>>;
  togglePlay?: () => void;
  playing: boolean;
};

export const LayoutContext = createContext<LayoutInterface>({
  primaryColor: "white",
  secondaryColor: "#E5C74D",
  playing: true,
});

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  // SET COLOR TEXT HEADER MENU
  const [primaryColor, setPrimaryColor] = useState("white");
  const [secondaryColor, setSecondaryColor] = useState("white");

  const [playing, setPlaying] = useState(true);
  const playerRef = useRef<any>(null);

  const togglePlay = () => {
    setPlaying(!playing);
  };

  return (
    <LayoutContext.Provider
      value={{
        primaryColor,
        setPrimaryColor,
        secondaryColor,
        setSecondaryColor,
        togglePlay,
        playing,
      }}
    >
      <ReactAudioPlayer
        style={{
          width: 0,
          height: 0,
          padding: 0,
          margin: 0,
          position: "absolute",
          userSelect: "none",
          pointerEvents: "none",
        }}
        ref={playerRef}
        src="evoce.mp3"
        autoPlay={true}
        controls={false}
        volume={0.6}
        loop={true}
      />
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayoutContext = () => useContext(LayoutContext);
