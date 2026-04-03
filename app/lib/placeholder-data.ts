// Placeholder data until we wire up PostgreSQL.
// Each product has an id, name, description, price, image, and a seller.
// Reviews are tied to a product by productId.

export const products = [
  {
    id: "1",
    name: "Hand-thrown Ceramic Mug",
    description:
      "A one-of-a-kind ceramic mug made on a pottery wheel. Holds about 12 oz and is microwave/dishwasher safe. Each one is slightly different because they are made by hand.",
    price: 28,
    image: "/globe.svg",
    seller: { id: "1", name: "Maria Torres" },
  },
  {
    id: "2",
    name: "Knitted Wool Scarf",
    description:
      "Soft merino wool scarf, hand-knitted. Measures about 60 inches long and 8 inches wide. Great for cold weather.",
    price: 45,
    image: "/globe.svg",
    seller: { id: "2", name: "James Park" },
  },
  {
    id: "3",
    name: "Wooden Cutting Board",
    description:
      "Walnut cutting board with a juice groove around the edge. Dimensions are roughly 12x18 inches. Finished with food-safe mineral oil.",
    price: 65,
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
