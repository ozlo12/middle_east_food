import "./globals.scss";

import classes from "./layout.module.scss";
import Navbar from "@/components/navbar/Navbar";
import { AuthProvider } from "@/contexts/auth-context";
import { CartProvider } from "@/contexts/cart-context";
import { ToastProvider } from "@/contexts/useToast";
import Script from "next/script";
import { Metadata } from "next";
import Analytics from "@/components/Analytics";

export const metadata: Metadata = {
  title: "Middle Eastern Food",
  description: "Delicious Syrian food",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/android-chrome-192x192.png"
        />

        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/android-chrome-512x512.png"
        />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />

        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
      </head>
      <body className={classes.body}>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_ANALYTICS_ID}`}
        />
        <Script id="google-analytics">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', '${process.env.NEXT_PUBLIC_ANALYTICS_ID}');
        `}
        </Script>
        <Analytics>
          <AuthProvider>
            <CartProvider>
              <Navbar />
              <ToastProvider>{children}</ToastProvider>
            </CartProvider>
          </AuthProvider>
        </Analytics>
      </body>
    </html>
  );
}
