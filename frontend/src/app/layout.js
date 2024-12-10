import Container from "./components/Container";
import Navbar from "./components/Navbar";
import "./globals.css";
import { Open_Sans } from "next/font/google";
const open_Sans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "500"],
});
export const metadata = {
  title: "E-Commerce Platform",
  description:
    "An all-in-one e-commerce solution with a comprehensive admin panel for managing products, orders, and customer interactions effectively.",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={open_Sans.className}>
        <Navbar />
        <Container>
          <div> {children}</div>
        </Container>
      </body>
    </html>
  );
}
