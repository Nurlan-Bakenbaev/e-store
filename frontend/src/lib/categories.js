import { Plus, List, BarChart2 } from "lucide-react";

export const categoriesArray = [
  {
    cat: "suits",
    image: "/categories/suits.jpg",
  },
  {
    cat: "t-shirts",
    image: "/categories/t-shirt.jpg",
  },
  {
    cat: "jeans",
    image: "/categories/jeans.jpg",
  },
  {
    cat: "dress",
    image: "/categories/dress.jpg",
  },
  {
    cat: "trousers",
    image: "/categories/pants.jpg",
  },
  {
    cat: "blouses",
    image: "/categories/blouse.jpg",
  },
];

//ADMIN PANEL
export const tabs = [
  {
    id: "create",
    label: "Create",
    icon: Plus,
  },
  {
    id: "products",
    label: "Products",
    icon: List,
  },
  {
    id: "analitics",
    label: "Analytics",
    icon: BarChart2,
  },
];
