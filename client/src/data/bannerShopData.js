import MenImage from "../assets/men-banner.png";
import WomenImage from "../assets/women-banner.png";
import OutwearImage from "../assets/outwear-banner.png";
import AccessoriesImage from "../assets/accessories-banner.png";

const bannerShopData = [
  {
    slug: "men",
    title: "MEN",
    description:
      "Technical apparel designed for everyday performance. Comfort, style and functionality in every piece.",
    image: MenImage,
  },
  {
    slug: "women",
    title: "WOMEN",
    description:
      "Modern essentials created for movement, confidence and everyday versatility.",
    image: WomenImage,
  },
  {
    slug: "outwear",
    title: "OUTERWEAR",
    description:
      "Outerwear built to protect you from the elements without sacrificing style.",
    image: OutwearImage,
  },
  {
    slug: "accessories",
    title: "ACCESSORIES",
    description:
      "Complete your outfit with functional accessories designed for every occasion.",
    image: AccessoriesImage,
  },
  {
    slug: "shop",
    title: "SHOP",
    description:
      "Discover our complete collection of apparel and accessories designed for modern lifestyles.",
    image: MenImage, // luego puedes crear un banner general
  },
];

export default bannerShopData;
