import { Inter, Playfair_Display } from "next/font/google";
import Navbar from "@/components/Navbar";
import SessionWrapper from "@/components/SessionWrapper";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata = {
  title: "KhanaKreation - AI Recipe Generator",
  description:
    "Generate personalized recipes based on your ingredients with AI",
  keywords: ["recipe", "AI", "cooking", "ingredients", "meal planning"],
};

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${playfair.variable}`}>
        <SessionWrapper>
          <Navbar />
          {children}
        </SessionWrapper>
      </body>
    </html>
  );
}
