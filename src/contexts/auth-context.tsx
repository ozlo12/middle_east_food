"use client";
import { ClientContainer } from "@/container/ClientContainer";
import { AuthService } from "@/services/auth.service";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const authService = ClientContainer.resolve(AuthService);

const context = createContext({
  emailPasswordAuth: authService.emailPasswordAuth,
  authState: false,
});

export const useAuth = () => useContext(context);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState(false);
  useEffect(() => {
    const dispose = authService.emailPasswordAuth.authObserver((user) => {
      setAuthState(user ? true : false);
    });
    return () => {
      dispose();
    };
  }, [null]);
  return (
    <context.Provider
      value={{ emailPasswordAuth: authService.emailPasswordAuth, authState }}
    >
      {children}
    </context.Provider>
  );
}
