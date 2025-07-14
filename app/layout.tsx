import type { Metadata } from "next";
import { Karla } from "next/font/google";
import "./globals.css";
import { FirebaseProvider } from "@/lib/firebase-context";

const karla = Karla({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nostos MVP",
  description: "Location-based photos archive",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <FirebaseProvider>
        <body className={karla.className}>{children}</body>
      </FirebaseProvider>
    </html>
  );
}
