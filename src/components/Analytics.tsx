"use client";
declare const window: Window & {
  dataLayer: Record<string, any>[];
  gtag: (type: string, id: string, ob: { page_path: string }) => void;
};
import { useCallback, useEffect } from "react";
import { usePathname } from "next/navigation";
export default function Analytics({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  const handleRouteChange = useCallback((url: string) => {
    window.gtag("config", process.env.NEXT_PUBLIC_ANALYTICS_ID || "", {
      page_path: url,
    });
  }, []);
  useEffect(() => {
    handleRouteChange(pathName);
  }, [pathName]);
  return <>{children}</>;
}
