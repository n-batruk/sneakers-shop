export type CreateProduct = Omit<Product, "id" | "created_at">;
export type UpdateProduct = Partial<Omit<Product, "id" | "created_at">>;
export type Product = {
  id: string;
  created_at: Date;
  title: string;
  description?: string;
  price: number;
  // image?: string;
};
