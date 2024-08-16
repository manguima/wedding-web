import { create } from "zustand";
import { Product } from "../types/product.type";
import { apiWorker } from "../apiWorker";

type ProductState = {
  products: Partial<Product>[];
  count: number;
  fetchProductList: (params: any) => Promise<void>;
  loadProductList: (params: any) => Promise<void>;
  buyProduct: (product: any) => Promise<void>;
  updateProducts: (data: Partial<Product>[]) => void;
};

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  count: 0,

  fetchProductList: async (params: any) => {
    await apiWorker.fetchProducts({
      params,
      onSuccess: (response) => {
        set({ products: response, count: response.length });
      },
      onError: (error) => {
        console.error("Erro ao carregar a lista de produtos.", error);
      },
    });
  },

  loadProductList: async (params: any) => {
    await apiWorker.fetchProducts({
      params,
      onSuccess: (response) => {
        set((state) => ({
          products: [...state.products, ...response],
          count: response.length,
        }));
      },
      onError: (error) => {
        console.error("Erro ao carregar a lista de produtos.", error);
      },
    });
  },

  buyProduct: async (product: any) => {
    await apiWorker.createPaymentLink({
      data: product,
      onSuccess: (response) => {
        window.location.href = response;
      },
      onError: (error) => {
        console.error("Erro ao criar link de pagamento.", error);
      },
    });
  },

  updateProducts: (data: Partial<Product>[]) => set({ products: data }),
}));
