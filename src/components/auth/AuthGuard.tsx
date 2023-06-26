import { ReactNode } from "react";
import { useAuth } from "@/contexts/auth-context";
import useMounted from "@/hooks/use-mounted";

interface AuthGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
  isAdmin?: boolean;
}
export default function AuthGuard({
  children,
  fallback = null,
  isAdmin = false,
}: AuthGuardProps) {
  const { auth, user } = useAuth();
  const { mounted } = useMounted();
  if (!mounted) return null;

  if (!user?.providerData.length || (isAdmin && !user.isAdmin))
    return <>{fallback}</>;

  return <>{children}</>;
}
