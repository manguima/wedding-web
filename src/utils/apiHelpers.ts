import { apiWorker } from '@/zustand/apiWorker';

export interface MusicSuggestionData {
  artistName: string;
  songTitle: string;
  message?: string;
  guestName: string;
  codeKey: string;
}

export const createMusicSuggestion = (data: MusicSuggestionData): Promise<{ success: boolean; message?: string; data?: any }> => {
  return new Promise((resolve, reject) => {
    apiWorker.createMusicSuggestion({
      data,
      onSuccess: (response) => {
        resolve({ success: true, data: response });
      },
      onError: (error) => {
        console.error('Music suggestion error:', error);
        const message = error?.response?.data?.message || error?.message || 'Erro ao enviar sugestão musical';
        reject(new Error(message));
      }
    });
  });
};