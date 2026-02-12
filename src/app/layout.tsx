import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/core/globals.css";
import { cn } from "@/core/lib/utils";
import Providers from "@/core/providers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SOBI Fantasy Game",
  description: "SOBI Fantasy Game",
  icons: {
    icon: "/assets/images/Sobi-Fantasy-Game-Logo.webp",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className={cn("antialiased font-sans bg-black overflow-hidden")}>
        {/* <Header /> */}
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
