// src/workers/apiWorker.ts
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL_API,
});

api.interceptors.response.use((response) => response.data);

type ApiWorkerParams<T = any> = {
  data?: T;
  params?: any;
  onSuccess?: (response: any) => void;
  onError?: (error: any) => void;
};

export const apiWorker = {
  loadInvite: async ({ data, onSuccess, onError }: ApiWorkerParams) => {
    try {
      const response = await api.post("/invite/validate", data);
      onSuccess?.(response);
    } catch (error) {
      onError?.(error);
    }
  },

  saveGuests: async ({ data, onSuccess, onError }: ApiWorkerParams) => {
    try {
      const response = await api.patch("/guest/create", data);
      onSuccess?.(response);
    } catch (error) {
      onError?.(error);
    }
  },

  fetchProducts: async ({ params, onSuccess, onError }: ApiWorkerParams) => {
    try {
      const response = await api.get("/products", { params });
      onSuccess?.(response);
    } catch (error) {
      onError?.(error);
    }
  },

  createPaymentLink: async ({ data, onSuccess, onError }: ApiWorkerParams) => {
    try {
      const response = await api.post("/payments/create", data);
      onSuccess?.(response);
    } catch (error) {
      onError?.(error);
    }
  },

  saveMessage: async ({ data, onSuccess, onError }: ApiWorkerParams) => {
    try {
      const response = await api.patch("/messages/create", data);
      onSuccess?.(response);
    } catch (error) {
      onError?.(error);
    }
  },
};
