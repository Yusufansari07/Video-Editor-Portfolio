import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next"
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Director | Cinematic Video Editing Portfolio",
    template: "%s | Director Portfolio"
  },
  description: "Professional video editor specializing in commercials, music videos, and narrative films. Crafting visual stories with precision and emotion.",
  keywords: ["video editor", "film editor", "commercial editing", "music videos", "post-production", "premiere pro", "davinci resolve"],
  authors: [{ name: "Director" }],
  openGraph: {
    title: "Director | Cinematic Video Editing Portfolio",
    description: "Professional video editor specializing in commercials, music videos, and narrative films.",
    type: "website",
    locale: "en_US",
    siteName: "Director Portfolio"
  },
  twitter: {
    card: "summary_large_image",
    title: "Director | Cinematic Video Editing Portfolio",
    description: "Professional video editor specializing in commercials, music videos, and narrative films.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased min-h-screen flex flex-col selection:bg-accent selection:text-white`}
      >
        {/* Film grain overlay for cinematic texture */}
        <div className="film-grain" />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
