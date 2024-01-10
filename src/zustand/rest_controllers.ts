import axios, { AxiosResponse } from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL_API,
});

// if we don't write the next line, our resources will receive the entire response in the data field. We don't want that.
api.interceptors.response.use((response) => response.data);

export const loadInvite = async (
  data: { codeKey: string },
  onSuccess: (data: any) => void
) => {
  await api.post("/invite/validate", data).then((response: AxiosResponse) => {
    return onSuccess(response);
  });
};

export const saveGuests = (data: any) => api.patch("/guest/create", data);
