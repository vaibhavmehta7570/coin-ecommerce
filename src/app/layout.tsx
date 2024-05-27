import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Tanstack from "@/lib/Tanstack";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CoinEcom",
  description: "Made By Vaibhav Mehta",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Tanstack>
          <Nav />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </Tanstack>
      </body>
    </html>
  );
}
