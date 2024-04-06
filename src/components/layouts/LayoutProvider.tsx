"use client";
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  createContext,
  useContext,
  useRef,
  useState,
} from "react";
import ReactPlayer from "react-player";

export type LayoutInterface = {
  primaryColor: string;
  setPrimaryColor?: Dispatch<SetStateAction<string>>;
  setOffsetKabuki?: Dispatch<SetStateAction<number>>;
  offsetKabuki?: number;
  secondaryColor?: string;
  setSecondaryColor?: Dispatch<SetStateAction<string>>;
  togglePlay?: () => void;
  playing?: boolean;
  playerRef?: MutableRefObject<null>;
};

export const LayoutContext = createContext<LayoutInterface>({
  primaryColor: "white",
  secondaryColor: "#E5C74D",
});

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  // SET COLOR TEXT HEADER MENU
  const [primaryColor, setPrimaryColor] = useState("white");
  const [secondaryColor, setSecondaryColor] = useState("white");

  const [playing, setPlaying] = useState(true);
  const playerRef = useRef(null);

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
        playerRef,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayoutContext = () => useContext(LayoutContext);
