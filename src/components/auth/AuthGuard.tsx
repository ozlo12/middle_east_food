import { ReactNode } from "react";
import { useAuth } from "../../contexts/auth.context";

interface AuthGuardProps {
  children: ReactNode;
  fallback: ReactNode;
  role: "user" | "admin";
}
export default function AuthGuard({
  children,
  fallback = null,
  role = "user",
}: AuthGuardProps) {
  const { authState } = useAuth();
  if (authState) return <>{children}</>;
  return <>{fallback}</>;
}
