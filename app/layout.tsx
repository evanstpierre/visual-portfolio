import type { Metadata } from "next";
import { Italiana, Aboreto, } from "next/font/google";
import "./globals.css";

const getItaliana = Italiana({
  variable: "--font-italiana",
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

const getAboreto = Aboreto({
  variable: "--font-aboreto",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Sara Hepperle",
  description: "Sara Hepperle's Personal Website",
  icons: {
    icon: '/icon/circle_icon.png',
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
        className={`${getItaliana.variable} ${getAboreto.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
