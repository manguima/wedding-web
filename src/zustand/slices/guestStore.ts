// src/stores/mainStore.ts
import { create } from "zustand";
import {
  ApiResult,
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

  validateCode: async (code: string): Promise<ApiResult> => {
    set({ loading: true });

    try {
      const response: any = await new Promise((resolve, reject) => {
        apiWorker.loadInvite({
          data: { codeKey: code },
          onSuccess: (response) => resolve(response),
          onError: (error) => reject(error),
        });
      });

      set({ code: response, guests: response?.Family[0] });
      return { success: true, response };
    } catch (error) {
      return { success: false, error: "Código não existe ou está incorreto." };
    } finally {
      set({ loading: false });
    }
  },

  saveGuest: async (guest: Partial<GuestProps>): Promise<ApiResult> => {
    set({ loading: true });

    try {
      const response: any = await new Promise((resolve, reject) => {
        apiWorker.saveGuests({
          data: guest,
          onSuccess: (response) => resolve(response),
          onError: (error) => reject(error),
        });
      });

      set({ guests: response });
      return { success: true, response };
    } catch (error) {
      return { success: false, error: "Erro ao salvar convidado." };
    } finally {
      set({ loading: false });
    }
  },

  saveMessage: async (message: Partial<MessageProps>): Promise<ApiResult> => {
    set({ loading: true });

    try {
      const response = await new Promise((resolve, reject) => {
        apiWorker.saveMessage({
          data: message,
          onSuccess: (response) => resolve(response),
          onError: (error) => reject(error),
        });
      });

      // Exemplo de manipulação da resposta:
      // set((state) => ({ messages: [...state.messages, response] }));

      return { success: true, response };
    } catch (error) {
      return { success: false, error: "Erro ao salvar mensagem." };
    } finally {
      set({ loading: false });
    }
  },

  updateCode: (data: CodeProps) => set({ code: data }),

  updateGuests: (data: GuestProps) => set({ guests: data }),
}));
