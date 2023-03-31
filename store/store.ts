import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface MessageStoreProps {
  message: string;
  setMessage: (message: string) => void;
  clearMessage: () => void;
}

export const useMessageStore = create<MessageStoreProps>()(
  persist(
    (set) => ({
      message: '',
      setMessage: (message: string) => set(() => ({ message })),
      clearMessage: () => set(() => ({ message: '' })),
    }),
    {
      name: 'message-storage',
    }
  )
);
