export type Product = {
  id: string;
  name: string;
  description: string; 
  price: number;
  image_url: string; 
  created_at?: string;

  artisan: {
    id: string;
    name: string;
  };

  category?: {
    id: string;
    name: string;
  };

  avg_rating?: number;
  review_count?: number;
};