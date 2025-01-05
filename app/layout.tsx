import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";
import { Toaster } from "./_components/ui/toaster";

const mulish = Mulish({
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: "Patricia Prudente",
  description: "Gerenciamento de Patricia Prudente",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${mulish.className} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
