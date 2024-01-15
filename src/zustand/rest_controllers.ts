import axios, { AxiosResponse } from "axios";
import { useCodeStore } from "./zustandProvider";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL_API,
});

// if we don't write the next line, our resources will receive the entire response in the data field. We don't want that.
api.interceptors.response.use((response) => response.data);

// VALIDATE INVITE GUEST
export const loadInvite = async (
  data: { codeKey: string },
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
