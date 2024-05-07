import { User } from '@prisma/client';

export type CreateUserSeedType = Omit<User, 'created_at' | 'jwt'>;
