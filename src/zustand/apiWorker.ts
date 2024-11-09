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

  fetchPayment: async ({ params, onSuccess, onError }: ApiWorkerParams) => {
    try {
      const response = await api.get("/payments", { params });
      onSuccess?.(response);
    } catch (error) {
      onError?.(error);
    }
  },

  createPaymentHistory: async ({
    data,
    onSuccess,
    onError,
  }: ApiWorkerParams) => {
    try {
      const response = await api.post("/payments", data);
      onSuccess?.(response);
    } catch (error) {
      onError?.(error);
    }
  },

  createPaymentLink: async ({ data, onSuccess, onError }: ApiWorkerParams) => {
    try {
      const response = await api.post("/payments/link", data);
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

  getStories: async ({ params, onSuccess, onError }: ApiWorkerParams) => {
    try {
      const response = await api.get(
        `/stories?take=${params?.take || 50}&skip=${params?.skip || 0}`,
        { params }
      );
      onSuccess?.(response);
    } catch (error) {
      onError?.(error);
    }
  },

  getNextStory: async ({ params, onSuccess, onError }: ApiWorkerParams) => {
    try {
      const response = await api.get(`/stories/${params.id}`);
      onSuccess?.(response);
    } catch (error) {
      onError?.(error);
    }
  },

  getRandomStory: async ({ params, onSuccess, onError }: ApiWorkerParams) => {
    try {
      const response = await api.get(`/stories/random`);
      onSuccess?.(response);
    } catch (error) {
      onError?.(error);
    }
  },

  saveStory: async ({ data, onSuccess, onError }: ApiWorkerParams) => {
    try {
      const binaryImage = Buffer.from(data.file.split(",")[1], "base64");
      const formData = new FormData();
      formData.append("file", new Blob([binaryImage], { type: "image/png" }));

      const response = await api.post("/stories/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          codekey: data.codeKey,
        },
      });
      onSuccess?.(response);
    } catch (error) {
      onError?.(error);
    }
  },

  validateCodeKey: async ({ data, onSuccess, onError }: ApiWorkerParams) => {
    try {
      const response = await api.post("/invite/validate", data);
      onSuccess?.(response);
    } catch (error) {
      onError?.(error);
    }
  },

  deleteStory: async ({ data, onSuccess, onError }: ApiWorkerParams) => {
    try {
      const response = await api.delete(`/stories/${data.id}`);
      onSuccess?.(response);
    } catch (error) {
      onError?.(error);
    }
  },
};
