// src/workers/apiWorker.ts
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL_API,
});

// Add tenant header to all requests
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    let tenantSlug = 'default';
    
    if (host.includes('localhost')) {
      const subdomain = host.split('.')[0];
      if (subdomain !== 'localhost') {
        tenantSlug = subdomain;
      }
    }
    
    // Send both headers for compatibility
    config.headers['X-Tenant-ID'] = tenantSlug;
    config.headers['X-Tenant-Slug'] = tenantSlug;
    
    console.log('ApiWorker - Sending tenant headers:', {
      'X-Tenant-ID': tenantSlug,
      'X-Tenant-Slug': tenantSlug,
      host: host
    });
  }
  return config;
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
      // Get tenant slug from URL
      let tenantSlug = 'default';
      if (typeof window !== 'undefined') {
        const host = window.location.hostname;
        if (host.includes('localhost')) {
          const subdomain = host.split('.')[0];
          if (subdomain !== 'localhost') {
            tenantSlug = subdomain;
          }
        }
      }
      
      console.log('🔍 ApiWorker - Validando convite');
      console.log('📍 Host:', typeof window !== 'undefined' ? window.location.hostname : 'server');
      console.log('🏢 Tenant Slug:', tenantSlug);
      console.log('🎫 Código:', data.codeKey);
      console.log('📤 Payload:', { ...data, tenantSlug });
      
      const response = await api.post("/invite/validate", {
        ...data,
        tenantSlug: tenantSlug
      });
      
      console.log('✅ Convite validado com sucesso:', response);
      onSuccess?.(response);
    } catch (error) {
      console.error('❌ Erro ao validar convite:', error);
      console.error('📋 Detalhes do erro:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data
      });
      onError?.(error);
    }
  },

  saveGuests: async ({ data, onSuccess, onError }: ApiWorkerParams) => {
    try {
      console.log('👥 ApiWorker - Salvando convidados');
      console.log('📤 Data enviada:', data);
      
      const response = await api.patch("/guest/create", data);
      
      console.log('✅ Convidados salvos com sucesso:', response);
      onSuccess?.(response);
    } catch (error) {
      console.error('❌ Erro ao salvar convidados:', error);
      console.error('📋 Detalhes do erro:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data
      });
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
        `/stories/public?take=${params?.take || 50}&skip=${params?.skip || 0}`,
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

  createMusicSuggestion: async ({ data, onSuccess, onError }: ApiWorkerParams) => {
    try {
      const response = await api.post("/sign-music", data);
      onSuccess?.(response);
    } catch (error) {
      onError?.(error);
    }
  },
};
