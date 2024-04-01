import { User } from "@/types/user.type";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface IUserState {
  token: string | null;
  setToken: (token: string) => void;
  deleteToken: () => void;
  user: User | null;
  setUser: (user: User) => void;
  deleteUser: () => void;
}

export const useUserStore = create(
  persist<IUserState>(
    (set) => ({
      token: null,
      setToken: (token: string): void => {
        set(() => ({ token }));
      },
      deleteToken: (): void => {
        set(() => ({ token: null }));
      },

      user: null,
      setUser: (user: User): void => {
        set(() => ({ user }));
      },
      deleteUser: (): void => {
        set(() => ({ user: null }));
      },
    }),
    {
      name: "user-store",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
