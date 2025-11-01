import type { CategoryInterface } from "./CategoryInterface";


export interface ProductInterface {
  id: string; // UII (UUID)
  title: string;
  slug: string;
  price: number;
  description: string;
  category: CategoryInterface;
  images: string[];
  createdAt: string;
  updatedAt: string;
}
