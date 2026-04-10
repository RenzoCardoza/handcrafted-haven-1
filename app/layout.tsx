import type { Metadata } from "next";
import { IBM_Plex_Serif, Baloo_2, Geist } from "next/font/google";
import "./globals.css";
import Providers from "@/app/components/Providers";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
      className={cn(ibmPlexSerif.variable, baloo2.variable, "font-sans", geist.variable)}
    >
      <body className="font-body min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
