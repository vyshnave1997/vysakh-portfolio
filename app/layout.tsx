import type { Metadata } from "next";
import { Saira } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/mouse"; // Adjust path as needed

const saira = Saira({
  variable: "--font-saira",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Vysakh | Quality Analyst",
  description: "Portfolio and insights of Vysakh — Quality Analyst focused on software testing, QA processes, and ensuring high-quality product releases.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${saira.variable} antialiased`}>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}