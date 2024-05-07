import { Product } from '@prisma/client';

export type CreateProductSeedType = Omit<Product, 'created_at' | 'updated_at'>;
