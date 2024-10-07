import type { Metadata } from "next";
import { Roboto } from "next/font/google"
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const roboto = Roboto({ subsets: ["latin"], weight: ["300", "400", "500", "500"] });

export const metadata: Metadata = {
  title: "DxncatSecurity",
  description: "A password manager for the modern age",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={roboto.className}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
