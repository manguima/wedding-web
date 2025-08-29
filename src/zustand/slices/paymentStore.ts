import { create } from "zustand";
import { apiWorker } from "../apiWorker";
import { PaymentHistory } from "../types/product.type";

// Definindo o tipo para o retorno das funções
type FetchResult = {
  success: boolean;
  response?: any;
  error?: string;
};

type PaymentState = {
  payments: Partial<PaymentHistory>[];
  createPayment: (data: any) => Promise<FetchResult>;
  fetchPayment: (params: any) => Promise<FetchResult>;
};

export const usePaymentStore = create<PaymentState>((set) => ({
  payments: [],
  fetchPayment: async (params: any): Promise<FetchResult> => {
    try {
      const response: Partial<PaymentHistory[]> = await new Promise(
        (resolve, reject) => {
          apiWorker.fetchPayment({
            params,
            onSuccess: (response) => resolve(response),
            onError: (error) => reject(error),
          });
        }
      );

      set({
        payments: response as Partial<PaymentHistory>[],
      });
      return { success: true, response };
    } catch (error) {
      return { success: false, error: "Erro ao carregar a lista de produtos." };
    }
  },

  createPayment: async (data: any): Promise<FetchResult> => {
    try {
      const response = await apiWorker.createPaymentHistory({
        data,
        onSuccess: (res: any) => res,
        onError: (err: any) => {
          throw err; // Lançar erro se ocorrer falha
        },
      });

      return { success: true, response };
    } catch (error) {
      return { success: false, error: "Erro ao criar pagamento" };
    }
  },
}));
