import { create } from "zustand";
import { Product } from "../types/product.type";
import { apiWorker } from "../apiWorker";

// Definindo o tipo para o retorno das funções
type FetchResult = {
  success: boolean;
  response?: any;
  error?: string;
};

type ProductState = {
  products: Partial<Product>[];
  count: number;
  fetchProductList: (params: any) => Promise<FetchResult>;
  loadProductList: (params: any) => Promise<FetchResult>;
  buyProduct: (product: any) => Promise<FetchResult>;
  updateProducts: (data: Partial<Product>[]) => void;
};

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  count: 0,

  fetchProductList: async (params: any): Promise<FetchResult> => {
    try {
      const response: Partial<Product[]> = await new Promise(
        (resolve, reject) => {
          apiWorker.fetchProducts({
            params,
            onSuccess: (response) => resolve(response),
            onError: (error) => reject(error),
          });
        }
      );

      set({
        products: response as Partial<Product>[],
        count: response && response?.length,
      });
      return { success: true, response };
    } catch (error) {
      return { success: false, error: "Erro ao carregar a lista de produtos." };
    }
  },

  loadProductList: async (params: any): Promise<FetchResult> => {
    try {
      const response: Partial<Product>[] = await new Promise(
        (resolve, reject) => {
          apiWorker.fetchProducts({
            params,
            onSuccess: (response) => resolve(response),
            onError: (error) => reject(error),
          });
        }
      );

      set((state) => ({
        products: [...state.products, ...response],
        count: response.length,
      }));
      return { success: true, response };
    } catch (error) {
      return { success: false, error: "Erro ao carregar a lista de produtos." };
    }
  },

  buyProduct: async (product: any): Promise<FetchResult> => {
    try {
      const response: string = await new Promise((resolve, reject) => {
        apiWorker.createPaymentLink({
          data: product,
          onSuccess: (response) => resolve(response),
          onError: (error) => reject(error),
        });
      });

      window.location.href = response;
      return { success: true, response };
    } catch (error) {
      return { success: false, error: "Erro ao criar link de pagamento." };
    }
  },

  updateProducts: (data: Partial<Product>[]) => set({ products: data }),
}));
