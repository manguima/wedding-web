"use client";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { create } from "zustand";
import { loadInvite, saveGuests, saveMessage } from "./rest_controllers";
import { useCurrentStep } from "@/components/HomePage/ConfirmInviteSection";

// useCodeStore((state) => state.updateCode(response.data));
// console.log(useCodeStore((state) => state.code));

type ZustandProps = {
  validateCode: (code: string) => void;
  createNewGuests: (code: any) => void;
  createNewMessage: (data: any) => void;
  inputLoading?: boolean;
  setInputLoading?: Dispatch<SetStateAction<boolean>>;
};

const ZustandContext = createContext<ZustandProps>({
  validateCode: () => {},
  createNewGuests: () => {},
  createNewMessage: () => {},
});

type CodeStoreProps = {
  code: {
    codeKey: string;
    createdAt: string;
    id: string;
    total: number;
    active: boolean;
  };
  updateCode: (data: any) => void;

  // ==================
  error: { section: number; message: string } | undefined;
  updateError: (data: any) => void;

  // ==================
  family: any;
  updateFamily: (data: any) => void;
};

export const useCodeStore = create<CodeStoreProps>((set) => ({
  // CODE VALUES
  code: {
    codeKey: "",
    createdAt: "",
    id: "",
    total: 0,
    active: false,
  },
  updateCode: (data: any) => set(() => ({ code: data })),

  // MESSAGE ERROR
  error: undefined,
  updateError: (data: any) => set(() => ({ error: data })),

  // FAMILY VALUES
  family: undefined,
  updateFamily: (data: any) => set(() => ({ family: data })),
}));

export const ZustandProvider = ({ children }: { children: ReactNode }) => {
  const [inputLoading, setInputLoading] = useState(false);

  const validateCode = (code: string) => {
    setInputLoading(true);
    loadInvite(
      { codeKey: code },
      (data) => {
        if (!!data) {
          useCodeStore.getState().updateCode(data);
          useCurrentStep
            .getState()
            .updateCurrentStep(useCurrentStep.getState().currentStep + 1);
        }
        return setInputLoading(false);
      },
      () => {
        useCodeStore.getState().updateError({
          section: 1,
          message: "Código não existe ou está incorreto.",
        });
        return setInputLoading(false);
      }
    );
  };

  const createNewGuests = (data: any) => {
    setInputLoading(true);
    saveGuests(
      data,
      (data) => {
        if (!!data) {
          useCodeStore.getState().updateFamily(data);
          useCurrentStep
            .getState()
            .updateCurrentStep(useCurrentStep.getState().currentStep + 1);
        }
        setInputLoading(false);
      },
      () => {
        useCodeStore.getState().updateError({
          section: 2,
          message:
            "Houve um erro ao tentar salvar o seu convite, tente novamente mais tarde.",
        });
        setInputLoading(false);
      }
    );
  };

  const createNewMessage = (data: any) => {
    setInputLoading(true);
    saveMessage(
      data,
      (data) => {
        if (!!data) {
          useCurrentStep
            .getState()
            .updateCurrentStep(useCurrentStep.getState().currentStep + 1);
        }
        setInputLoading(false);
      },
      (err) => {
        useCodeStore.getState().updateError({
          section: 3,
          message:
            "Houve um erro ao tentar salvar sua mensagem, tente novamente mais tarde.",
        });
        setInputLoading(false);
      }
    );
  };

  return (
    <ZustandContext.Provider
      value={{
        validateCode,
        createNewGuests,
        inputLoading,
        setInputLoading,
        createNewMessage,
      }}
    >
      {children}
    </ZustandContext.Provider>
  );
};

export const useZustandContext = () => useContext(ZustandContext);
