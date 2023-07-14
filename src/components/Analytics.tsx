"use client";
declare const window: Window & { dataLayer: Record<string, any>[] };
import Script from "next/script";
import { useEffect } from "react";

export default function Analytics() {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_ANALYTICS_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
              if(!window.dataLayer) window.dataLayer=[];
              function gtag(){window.dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', ${process.env.NEXT_PUBLIC_ANALYTICS_ID}, {
                page_path: window.location.pathname,
              });
          `,
        }}
      />
    </>
  );
}
