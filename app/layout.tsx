import type { Metadata } from "next";
import { Libre_Baskerville, Italiana, Aboreto, } from "next/font/google";
import "./globals.css";

const getLibre = Libre_Baskerville({
  weight: ["400", "700"], // normal and bold
  subsets: ["latin"],
  display: "swap",
  variable: "--font-libre", // custom CSS variable name
});
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
  description: "Sara's Hepperle's Website",
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
        className={`${getItaliana.variable} ${getAboreto.variable} ${getLibre.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
