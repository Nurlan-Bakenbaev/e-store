import localFont from "next/font/local";
import "./globals.css";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
});
export const metadata = {
  title: "E-Commerce",
  description: " E-Commerce with Admin Panel",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
