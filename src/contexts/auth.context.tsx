"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Container } from "../container/Container";
import { AuthEmailService } from "@services/auth-email.service";

const _auth = Container.resolve(AuthEmailService);

const auth = {
  isAuthenticated: () => _auth.isAuthenticated(),
  signup: (email: string, password: string) => _auth.signup(email, password),
  login: (email: string, password: string) => _auth.login(email, password),
  signOut: () => _auth.signOut(),
  authState: false,
};
const authContext = createContext(auth);

export const useAuth = () => useContext(authContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState(false);
  useEffect(() => {
    const dispose = _auth.regsterAuthObserver((user) => {
      if (user) setAuthState(true);
      else setAuthState(false);
    });
    return dispose;
  }, []);

  return (
    <authContext.Provider value={{ ...auth, authState }}>
      {children}
    </authContext.Provider>
  );
}
