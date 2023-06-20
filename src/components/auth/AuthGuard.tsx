import { ReactNode, useEffect, useState } from "react";
import { useAuth } from "../../contexts/auth.context";
import useMounted from "../../hooks/use-mounted";

interface AuthGuardProps {
  children: ReactNode;
  fallback: ReactNode;
}
export default function AuthGuard({
  children,
  fallback = null,
}: AuthGuardProps) {
  const { authState } = useAuth();
  const { mounted } = useMounted();
  if (!mounted) return null;
  if (authState) return <>{children}</>;
  return <>{fallback}</>;
}
