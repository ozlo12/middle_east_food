"use client";
import { authModule } from "@/container/ClientContainer";
import { EmailPasswordAuthContract } from "@/contracts/EmailPasswordAuthContract";
import { User } from "firebase/auth";
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

interface AuthState {
  user?: (User & { isAdmin?: boolean }) | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
}
const context = createContext<{
  emailPasswordAuth: EmailPasswordAuthContract;
  authState: AuthState;
}>({
  emailPasswordAuth: authModule.emailPasswordAuth,
  authState: {
    isAuthenticated: false,
    isAdmin: false,
    user: null,
  },
});

export const useAuth = () => useContext(context);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAdmin: false,
    isAuthenticated: false,
  });
  useEffect(() => {
    const dispose = authModule.emailPasswordAuth.authObserver(
      (user: AuthState["user"]) => {
        setAuthState({
          isAuthenticated: !!user,
          isAdmin: user?.isAdmin || false,
          user,
        });
      }
    );
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
