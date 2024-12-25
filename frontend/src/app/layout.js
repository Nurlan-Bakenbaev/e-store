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
  title: "E-Commerce Platform | Manage Products, Orders, and Customers",
  description:
    "Experience seamless e-commerce management with our all-in-one platform. Efficiently manage products, track orders, and engage with customers through an intuitive admin panel. Optimize your online store for growth and success.",
  keywords:
    "e-commerce, online store, product management, order management, customer management, admin panel, e-commerce platform",
  author: "E-Commerce Platform",
  robots: "index, follow",
  openGraph: {
    type: "website",
    title: "E-Commerce Platform | Manage Products, Orders, and Customers",
    description:
      "An all-in-one e-commerce solution to help you effectively manage products, orders, and customer interactions.",
    url: "https://your-ecommerce-platform.com",
    image:
      "https://img.freepik.com/free-photo/wooden-symbol-shopping-cart-online-shopping-concept_1387-883.jpg?t=st=1735168914~exp=1735172514~hmac=04edab659c39c12d6b0fec32231e051733a3844e3b3ea9b77b93be4ca9b9c7c3&w=826",
    site_name: "E-Commerce Platform",
  },
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
