import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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

export const metadata: Metadata = {
  title: {
    template: "%s | Jollycount",
    default: "Jollycount 2024 - en helt syk nedtelling til jul!",
  },
  description:
    "Lurer du av og til på hvor lenge det er igjen til jul? I så fall trenger du ikke lure lenger! Jollycount gir deg svaret! Kom og tell ned til jul 2024 med oss!",
  keywords: [
    "jul nedtelling",
    "christmas countdown norway",
    "julaften 2024",
    "norsk julenedtelling",
    "tid til jul",
  ],
  authors: [{ name: "Fredrik Netland Carlsen" }],
  metadataBase: new URL("https://jollycount.no"),
  openGraph: {
    title: "Jollycount 2024 - den sykeste nedtellingen til jul du har sett!",
    description:
      "Se hvor lenge det er igjen til jul 2024! Du trodde kanskje du hadde sett en nedtelling, men du har aldri sett en som denne!",
    url: "https://jollycount.no",
    siteName: "Jollycount",
    locale: "nb_NO",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Jollycount 2024 - Nedtelling til jul",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jollycount 2024 - Nedtelling til jul",
    description:
      "Hvor lenge er det igjen til jul?! Hvem bruker twitter i 2024?",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
