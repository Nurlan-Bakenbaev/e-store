import Container from "./components/Container";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./globals.css";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "400"],
});
export const metadata = {
  title: "E-Commerce Platform",
  description:
    "An all-in-one e-commerce solution with a comprehensive admin panel for managing products, orders, and customer interactions effectively.",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Navbar />
        <Container>{children}</Container>
        <Footer />
      </body>
    </html>
  );
}
