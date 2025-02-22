import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {Header} from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Daily Games - Descubra jogos incríveis para se divertir",
  description: "Mais de 10 mil jogos para você se divertir, jogos de ação, aventura, corrida, tiro, estratégia e muito mais.",
  keywords: ["jogos", "games", "diversão", "jogos online", "jogos grátis"],
  openGraph:{
    images: [`${process.env.PROJECT_URL}/preview.png`]
  },
  robots: {
    index: true,
    follow: true,
    nocache:true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
    },
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Header />
      {children}</body>
    </html>
  );
}
