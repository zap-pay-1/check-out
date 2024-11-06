import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClientProviders } from "@/providers/client-provider";
import { ParticleConnectkit } from "@/providers/connectKit-provider";
import { KlasterProvider } from "@/providers/klaster-provider";
import { Toaster } from "@/components/ui/toaster";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Seamless Web3 Payments & Invoicing for Modern Merchants",
  description:
    "Effortlessly create invoices and payment links using our Web3 platform. Accept payments in crypto, manage transactions, and streamline your merchant operations.",

  keywords: [
    "Web3 payments",
    "Crypto payments",
    "recurring payments",
    "Telegram subscription",
    "earn from Telegram",
    "Zap",
  ],

  openGraph: {
    title: "Seamless Web3 Payments & Invoicing for Modern Merchants",
    description:
      "Effortlessly create invoices and payment links using our Web3 platform. Accept payments in crypto, manage transactions, and streamline your merchant operations.",
    url: "https://www.usezap.xyz",
    images: [
      {
        url: "/img/monitize-tg.png",
        width: 800,
        height: 600,
        alt: "Seamless Web3 Payments & Invoicing for Modern Merchants",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Seamless Web3 Payments & Invoicing for Modern Merchants",
    description:
      "Effortlessly create invoices and payment links using our Web3 platform. Accept payments in crypto, manage transactions, and streamline your merchant operations.",
    images: ["/images/monetize-tg.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientProviders>
          <ParticleConnectkit>
            <KlasterProvider>
              <Toaster  />
        {children}
        </KlasterProvider>
        </ParticleConnectkit>
        </ClientProviders>
      </body>
    </html>
  );
}
