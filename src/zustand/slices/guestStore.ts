// src/stores/mainStore.ts
import { create } from "zustand";
import {
  CodeProps,
  GuestProps,
  MainState,
  MessageProps,
} from "../types/guest.type";
import { apiWorker } from "../apiWorker";

// Código inicial
const initialCode: CodeProps = {
  codeKey: "",
  createdAt: "",
  id: "",
  total: 0,
  active: false,
};

export const useGuestStore = create<MainState>((set) => ({
  code: initialCode,
  guests: null,
  loading: false,

  validateCode: async (code: string) => {
    set({ loading: true });

    await apiWorker
      .loadInvite({
        data: { codeKey: code },
        onSuccess: (response) => {
          set({ code: response, guests: response?.Family[0] });
        },
        onError: (error) => {
          console.error("Código não existe ou está incorreto.", error);
        },
      })
      .finally(() => {
        set({ loading: false });
      });
  },

  saveGuest: async (guest: Partial<GuestProps>) => {
    set({ loading: true });

    await apiWorker
      .saveGuests({
        data: guest,
        onSuccess: (response) => {
          set({ guests: response });
        },
        onError: (error) => {
          console.error("Erro ao salvar convidado.", error);
        },
      })
      .finally(() => {
        set({ loading: false });
      });
  },

  saveMessage: async (message: Partial<MessageProps>) => {
    set({ loading: true });

    await apiWorker
      .saveMessage({
        data: message,
        onSuccess: (response) => {
          // set((state) => ({ messages: [...state.messages, response] }));
        },
        onError: (error) => {
          console.error("Erro ao salvar mensagem.", error);
        },
      })
      .finally(() => {
        set({ loading: false });
      });
  },

  updateCode: (data: CodeProps) => set({ code: data }),

  updateGuests: (data: GuestProps) => set({ guests: data }),
}));
