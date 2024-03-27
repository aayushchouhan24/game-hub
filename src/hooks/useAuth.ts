import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../services/firebase";
import useUserStore from "../stores/UserStore";

const useAuth = () => {
  const setUser = useUserStore((s) => s.setUser);

  return {
    signInWithGoogle: async () => {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        localStorage.setItem("user", JSON.stringify(result.user));
        setUser(result.user);
      } catch (err) {
        throw err;
      }
    },
    signOut: async () => {
      try {
        await auth.signOut();
        localStorage.setItem("user", JSON.stringify(null));
        setUser(null);
      } catch (err) {
        throw err;
      }
    },
  };
};

export default useAuth;
