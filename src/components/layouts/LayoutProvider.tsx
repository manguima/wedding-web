"use client";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

export type LayoutInterface = {
  primaryColor: string;
  setPrimaryColor?: Dispatch<SetStateAction<string>>;
  setOffsetKabuki?: Dispatch<SetStateAction<number>>;
  offsetKabuki?: number;
  secondaryColor?: string;
  setSecondaryColor?: Dispatch<SetStateAction<string>>;
};

export const LayoutContext = createContext<LayoutInterface>({
  primaryColor: "white",
  secondaryColor: "#E5C74D",
});

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  // SET COLOR TEXT HEADER MENU
  const [primaryColor, setPrimaryColor] = useState("white");
  const [secondaryColor, setSecondaryColor] = useState("white");

  return (
    <LayoutContext.Provider
      value={{
        primaryColor,
        setPrimaryColor,
        secondaryColor,
        setSecondaryColor,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayoutContext = () => useContext(LayoutContext);
