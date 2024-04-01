import { Product } from '@prisma/client';

export class ProductResponseModel {
  public id: string;
  public title: string;
  public description: string;
  public price: number;
  public image: string | null;
  public created_at: Date;

  constructor(product: Product) {
    this.id = product.id;
    this.title = product.title;
    this.description = product.description;
    this.price = product.price;
    this.image = product.image
      ? `http://localhost:3000/${product.image}`
      : null;
    this.created_at = product.created_at;
  }
}
