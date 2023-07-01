"use client";
import { authService, firebaseAuth } from "@/container/ClientContainer";
import { FirebaseAuth } from "@/services/firebase/auth/Auth";
import { User } from "firebase/auth";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const context = createContext<{
  auth: FirebaseAuth;
  user: null | (User & { isAdmin?: boolean });
}>({
  // emailPasswordAuth: authModule.emailPasswordAuth,
  auth: firebaseAuth,
  user: null,
});

export const useAuth = () => useContext(context);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<null | (User & { isAdmin?: boolean })>(null);
  useEffect(() => {
    return firebaseAuth.onAuthStateChanged(async (user) => {
      const alteredUser: (User & { isAdmin?: boolean }) | null = user;

      if (alteredUser) {
        const { isAdmin } = await fetch(
          `${process.env.VERCEL_URL}/api/auth/${alteredUser.uid}`
        ).then((res) => res.json());
        alteredUser.isAdmin = isAdmin;
      }
      setUser(alteredUser);
    });
  }, [null]);
  return (
    <context.Provider value={{ auth: firebaseAuth, user }}>
      {children}
    </context.Provider>
  );
}
