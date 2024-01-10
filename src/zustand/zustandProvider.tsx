"use client";
import { ReactNode, createContext, useContext } from "react";
import { StoreApi, UseBoundStore, create } from "zustand";
import { loadInvite } from "./rest_controllers";

export type CodeStateProps = {
  code: {
    id: string;
    total: number;
    codeKey: string;
    createdAt: string;
    active: false;
  };
};

type Action = {
  updateCode: (code: CodeStateProps["code"]) => void;
};

// useCodeStore((state) => state.updateCode(response.data));
// console.log(useCodeStore((state) => state.code));

type ZustandProps = {
  validateCode: () => void;
};

const ZustandContext = createContext<ZustandProps>({ validateCode: () => {} });

export const useCodeStore = create(() => ({
  code: {
    codeKey: "",
    createdAt: "",
    id: "",
    total: 0,
    active: false,
  },
}));

export const ZustandProvider = ({ children }: { children: ReactNode }) => {
  const validateCode = () => {
    loadInvite({ codeKey: "PD01" }, (data) => {
      useCodeStore.setState(data);
      // console.log(useCodeStore.getState());
    });
  };

  return (
    <ZustandContext.Provider value={{ validateCode }}>
      {children}
    </ZustandContext.Provider>
  );
};

export const useZustandContext = () => useContext(ZustandContext);
