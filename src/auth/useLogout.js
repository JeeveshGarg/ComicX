import { useCallback } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const useLogout = () => {
  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };
  return useCallback(logOut, []);
};

export default useLogout;
