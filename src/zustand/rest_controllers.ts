import axios, { AxiosResponse } from "axios";
import { useCodeStore } from "./zustandProvider";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_URL_API,
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
  }
  return config;
});

// if we don't write the next line, our resources will receive the entire response in the data field. We don't want that.
api.interceptors.response.use((response) => response.data);

// VALIDATE INVITE GUEST
export const loadInvite = async (
  data: { codeKey: string; tenantId: string },
  onSuccess: (data: any) => void,
  onError: (error: any) => void
) => {
  await api
    .post("/invite/validate", data)

    .then((response: AxiosResponse) => {
      return onSuccess(response);
    })

    .catch((e) => {
      return onError(e);
    });
};

// SAVE NEW GUESTS
export const saveGuests = async (
  data: any,
  onSuccess: (data: any) => void,
  onError: (error: any) => void
) => {
  await api
    .patch("/guest/create", data)

    .then((response: AxiosResponse) => {
      return onSuccess(response);
    })

    .catch((e) => {
      return onError(e);
    });
};

// FETCH PRODUCTS
export const fetchProducts = async (
  params: any,
  onSuccess: (data: any) => void,
  onError: (error: any) => void
) => {
  await api
    .get("/products", { params })
    .then((response: AxiosResponse) => {
      return onSuccess(response);
    })
    .catch((e) => {
      return onError(e);
    });
};

// CREATE PAYMENT LINK (Asaas)
export const createPaymentLink = async (
  product: any,
  onSuccess: (data: any) => void,
  onError: (error: any) => void
) => {
  await api
    .post("/payments/create", product)
    .then((response: AxiosResponse) => {
      return onSuccess(response);
    })
    .catch((e) => {
      return onError(e);
    });
};

// SAVE MESSAGE

export const saveMessage = async (
  data: any,
  onSuccess: (data: any) => void,
  onError: (error: any) => void
) => {
  await api
    .patch("messages/create", data)
    .then((response: AxiosResponse) => {
      return onSuccess(response);
    })
    .catch((e) => {
      return onError(e);
    });
};
