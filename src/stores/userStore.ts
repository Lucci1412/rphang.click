import { create } from "zustand";

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   avatar?: string;
//   role?: string;
//   level:
// }
import { UserType } from "@/modules/auth/ui/type";
interface UserStore {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
