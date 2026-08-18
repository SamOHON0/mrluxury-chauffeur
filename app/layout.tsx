import type { Metadata } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import IntroOverlay from "@/components/IntroOverlay";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MR Luxury Chauffeur | Private Chauffeur Service in Dublin",
  description:
    "First-class chauffeur travel in Dublin in a fully electric Mercedes-Benz EQS SUV. Airport transfers, corporate travel, weddings and private tours of Ireland.",
  openGraph: {
    title: "MR Luxury Chauffeur",
    description:
      "Private chauffeur service in Dublin. Fully electric Mercedes-Benz EQS SUV.",
    locale: "en_IE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} ${manrope.variable}`}>
      <body>
        <IntroOverlay />
        <Nav />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
