import { User } from "firebase/auth";
import { create } from "zustand";

interface GameQueryStore {
  user: User | null;
  setUser: (user: User | null) => void;
}


const user = localStorage.getItem("user");
const parsedUser = user ? JSON.parse(user) : null;

const useUserStore = create<GameQueryStore>((set) => ({
  user: parsedUser,
  setUser: (user) => set(() => ({ user })),
}));

export default useUserStore;
