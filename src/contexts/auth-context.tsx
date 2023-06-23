"use client";
import { authModule } from "@/container/ClientContainer";
// import { ClientContainer } from "@/container/ClientContainer";
// import { AuthService } from "@/services/auth.service";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

// const authModule = ClientContainer.resolve(AuthService);

const context = createContext({
  emailPasswordAuth: authModule.emailPasswordAuth,
  authState: false,
});

export const useAuth = () => useContext(context);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState(false);
  useEffect(() => {
    const dispose = authModule.emailPasswordAuth.authObserver((user) => {
      setAuthState(user ? true : false);
    });
    return () => {
      dispose();
    };
  }, [null]);
  return (
    <context.Provider
      value={{ emailPasswordAuth: authModule.emailPasswordAuth, authState }}
    >
      {children}
    </context.Provider>
  );
}
