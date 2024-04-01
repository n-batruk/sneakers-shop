import { CreateUserSeedType } from './user.type';

export const UserSeeds: CreateUserSeedType[] = [
  {
    role: 'ADMIN',
    email: 'admin@gmail.com',
    password: '1234',
    first_name: 'admin',
    last_name: 'admin',
  },
  {
    role: 'CLIENT',
    email: 'test@gmail.com',
    password: 'test',
    first_name: 'test',
    last_name: 'client',
  },
];
