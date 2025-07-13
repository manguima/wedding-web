"use client";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import { create } from "zustand";
import {
  createPaymentLink,
  fetchProducts,
  loadInvite,
  saveGuests,
  saveMessage,
} from "./rest_controllers";
import { useCurrentStep } from "@/components/HomePage/ConfirmInviteSection";
import { Product } from "./types/product.type";

// useCodeStore((state) => state.updateCode(response.data));
// console.log(useCodeStore((state) => state.code));

type ZustandProps = {
  validateCode: (code: string) => void;
  createNewGuests: (code: any) => void;
  createNewMessage: (data: any) => void;
  fetchProductList: (params: any) => void;
  loadProductList: (params: any) => void;
  buyProduct: (product: any) => void;
  inputLoading?: boolean;
  setInputLoading?: Dispatch<SetStateAction<boolean>>;
};

const ZustandContext = createContext<ZustandProps>({
  validateCode: () => {},
  createNewGuests: () => {},
  createNewMessage: () => {},
  fetchProductList: () => {},
  loadProductList: () => {},
  buyProduct: () => {},
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

  products: Partial<Product>[];
  updateProducts: (data: any) => void;

  // ==================
  error: { section: number; message: string } | undefined;
  updateError: (data: any) => void;

  // ==================
  family: any;
  updateFamily: (data: any) => void;
};

const initialValues = {
  codeKey: "",
  createdAt: "",
  id: "",
  total: 0,
  Family: undefined,
  active: false,
};

export const useCodeStore = create<CodeStoreProps>((set) => ({
  // CODE VALUES
  code: initialValues,
  updateCode: (data: any) => set(() => ({ code: data })),

  // MESSAGE ERROR
  error: undefined,
  updateError: (data: any) => set(() => ({ error: data })),

  products: [],
  updateProducts: (data: any) => set(() => ({ products: data })),

  // FAMILY VALUES
  family: undefined,
  updateFamily: (data: any) => set(() => ({ family: data })),
}));

export const ZustandProvider = ({ children }: { children: ReactNode }) => {
  const [inputLoading, setInputLoading] = useState(false);

  const validateCode = (code: string) => {
    setInputLoading(true);
    useCodeStore.getState().updateCode(initialValues);
    loadInvite(
      { codeKey: code, tenantId: '' },
      (data) => {
        if (!!data) {
          useCodeStore.getState().updateCode(data);
          useCurrentStep
            .getState()
            .updateCurrentStep(useCurrentStep.getState().currentStep + 1);

          if (data?.Family?.[0]) {
            useCodeStore.getState().updateFamily(data?.Family?.[0]);
          }
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

  const buyProduct = (product: any) => {
    setInputLoading(true);
    createPaymentLink(
      product,
      (data) => {
        // console.log(data);
        window.location.href = data;
        setInputLoading(false);
      },
      () => {
        useCodeStore.getState().updateError({
          section: 3,
          message: "Erro ao criar link de pagamento.",
        });
        setInputLoading(false);
      }
    );
  };

  const fetchProductList = useCallback(
    async (params: any) => {
      setInputLoading(true);
      await fetchProducts(
        params,
        (data) => {
          useCodeStore.getState().updateProducts(data);
          setInputLoading(false);
        },
        () => {
          useCodeStore.getState().updateError({
            section: 2,
            message: "Erro ao carregar a lista de produtos.",
          });
          setInputLoading(false);
        }
      );
    },
    [useCodeStore.getState().products]
  );

  const loadProductList = useCallback(
    async (params: any) => {
      setInputLoading(true);
      await fetchProducts(
        params,
        (data) => {
          // useCodeStore
          //   .getState()
          //   .updateProducts([...useCodeStore.getState().products, ...data]);
          setInputLoading(false);
          return data;
        },
        () => {
          useCodeStore.getState().updateError({
            section: 2,
            message: "Erro ao carregar a lista de produtos.",
          });
          setInputLoading(false);
        }
      );
    },
    [useCodeStore.getState().products]
  );

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
        fetchProductList,
        loadProductList,
        buyProduct,
      }}
    >
      {children}
    </ZustandContext.Provider>
  );
};

export const useZustandContext = () => useContext(ZustandContext);
