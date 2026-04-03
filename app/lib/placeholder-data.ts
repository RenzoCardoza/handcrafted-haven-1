// Placeholder data until we wire up PostgreSQL.
// Each product has an id, name, description, price, image, category, and a seller.
// Reviews are tied to a product by productId.

export const categories = [
  "Ceramics",
  "Textiles",
  "Woodwork",
  "Jewelry",
  "Art",
];

export const products = [
  {
    id: "1",
    name: "Hand-thrown Ceramic Mug",
    description:
      "A one-of-a-kind ceramic mug made on a pottery wheel. Holds about 12 oz and is microwave/dishwasher safe. Each one is slightly different because they are made by hand.",
    price: 28,
    category: "Ceramics",
    image: "/globe.svg",
    seller: { id: "1", name: "Maria Torres" },
  },
  {
    id: "2",
    name: "Knitted Wool Scarf",
    description:
      "Soft merino wool scarf, hand-knitted. Measures about 60 inches long and 8 inches wide. Great for cold weather.",
    price: 45,
    category: "Textiles",
    image: "/globe.svg",
    seller: { id: "2", name: "James Park" },
  },
  {
    id: "3",
    name: "Wooden Cutting Board",
    description:
      "Walnut cutting board with a juice groove around the edge. Dimensions are roughly 12x18 inches. Finished with food-safe mineral oil.",
    price: 65,
    category: "Woodwork",
    image: "/globe.svg",
    seller: { id: "1", name: "Maria Torres" },
  },
  {
    id: "4",
    name: "Silver Leaf Earrings",
    description:
      "Sterling silver earrings shaped like small leaves. Lightweight and comfortable for everyday wear.",
    price: 34,
    category: "Jewelry",
    image: "/globe.svg",
    seller: { id: "3", name: "Priya Sharma" },
  },
  {
    id: "5",
    name: "Watercolor Landscape Print",
    description:
      "8x10 print of an original watercolor painting. Printed on archival paper with a white border for easy framing.",
    price: 22,
    category: "Art",
    image: "/globe.svg",
    seller: { id: "4", name: "Liam Chen" },
  },
  {
    id: "6",
    name: "Ceramic Planter Pot",
    description:
      "Small hand-glazed planter with a drainage hole. About 4 inches tall, good for succulents or herbs.",
    price: 18,
    category: "Ceramics",
    image: "/globe.svg",
    seller: { id: "1", name: "Maria Torres" },
  },
  {
    id: "7",
    name: "Macrame Wall Hanging",
    description:
      "Cotton macrame wall hanging, about 24 inches wide. Hangs from a wooden dowel.",
    price: 40,
    category: "Textiles",
    image: "/globe.svg",
    seller: { id: "2", name: "James Park" },
  },
  {
    id: "8",
    name: "Walnut Serving Spoon",
    description:
      "Hand-carved walnut spoon, about 12 inches long. Good for salads or pasta. Finished with food-safe oil.",
    price: 25,
    category: "Woodwork",
    image: "/globe.svg",
    seller: { id: "1", name: "Maria Torres" },
  },
];

export const reviews = [
  {
    id: "1",
    productId: "1",
    rating: 5,
    comment: "Love this mug! The glaze color is even better in person.",
    reviewerName: "Alex K.",
    date: "2026-04-02",
  },
  {
    id: "2",
    productId: "1",
    rating: 4,
    comment: "Nice quality. A little smaller than I expected but still good.",
    reviewerName: "Sam R.",
    date: "2026-04-02",
  },
  {
    id: "3",
    productId: "2",
    rating: 5,
    comment: "Super warm and the color is exactly what was shown in the photo.",
    reviewerName: "Jordan M.",
    date: "2026-04-02",
  },
  {
    id: "4",
    productId: "3",
    rating: 4,
    comment: "Solid board. The walnut grain looks great on my counter.",
    reviewerName: "Casey L.",
    date: "2026-04-02",
  },
];
