import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import type { Metadata } from "next";
import { Bakbak_One } from "next/font/google";
import Providers from "../components/Providers";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ToastContainer } from "react-toastify";

const bakbak = Bakbak_One({
  subsets: ["latin"],
  weight: "400",
  style: "normal",
  variable: "--var-bakbak-one",
});

export const metadata: Metadata = {
  title: "Paradigma",
  description: "Blockchain NFT Metaverse debates platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={bakbak.variable}>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}
