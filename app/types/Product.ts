export type Product = {
  id: string;
  name: string;
  description?: string;
  price: number;
  image_url?: string;
  created_at?: string;

  seller: {
    id: string;
    name: string;
  };

  category?: {
    id: string;
    name: string;
  };
};
