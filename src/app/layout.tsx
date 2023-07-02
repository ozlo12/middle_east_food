import "./globals.scss";

import classes from "./layout.module.scss";
import Navbar from "@/components/navbar/Navbar";
import { AuthProvider } from "@/contexts/auth-context";
import { CartProvider } from "@/contexts/cart-context";
import { ToastProvider } from "@/contexts/useToast";

export const metadata = {
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
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <ToastProvider>{children}</ToastProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
