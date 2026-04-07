import type { Metadata } from "next";
import { IBM_Plex_Serif, Baloo_2 } from "next/font/google";
import "./globals.css";
import Providers from "@/app/components/Providers";

const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "700"], // normal + bold for headings
  variable: "--font-heading",
});

const baloo2 = Baloo_2({
  subsets: ["latin"],
  weight: ["400", "600"], // regular + semi-bold for body/nav
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Handcrafted Haven",
  description: "Discover unique handmade creations",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${ibmPlexSerif.variable} ${baloo2.variable}`}
    >
      <body className="font-body min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
