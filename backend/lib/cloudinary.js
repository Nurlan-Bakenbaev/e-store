import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: "dvynmrss4",
  api_key: "795289841653837",
  api_secret: "lGiLFPvvO2563K7Za4vg0iufU64",
});
export default cloudinary;
