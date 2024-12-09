import Navbar from "./components/Navbar";
import "./globals.css";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
});
export const metadata = {
  title: "E-Commerce Platform",
  description:
    "An all-in-one e-commerce solution with a comprehensive admin panel for managing products, orders, and customer interactions effectively.",
  keywords:
    "e-commerce, online shopping, admin panel, product management, order management",
  author: "Shopper",
  viewport: "width=device-width, initial-scale=1.0",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <div className="min-h-screen bg-gradient-to-t from-background to-foreground text-white relative overflow-hidden">
          <Navbar />
          <div className="pt-20"> {children}</div>
        </div>
      </body>
    </html>
  );
}
