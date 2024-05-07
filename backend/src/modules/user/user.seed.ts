import { CreateUserSeedType } from './user.type';

export const UserSeeds: CreateUserSeedType[] = [
  {
    id: 'c734be40-e158-43c5-8668-0daafbcae42d',
    role: 'ADMIN',
    email: 'admin@gmail.com',
    password: '1234',
    first_name: 'admin',
    last_name: 'admin',
  },
  {
    id: 'c620cefd-ead5-4801-9645-c4003aff8719',
    role: 'CLIENT',
    email: 'test@gmail.com',
    password: 'test',
    first_name: 'test',
    last_name: 'client',
  },
  {
    id: '3ff00d79-6799-4ffc-adf8-de5cfd264898',
    role: 'CLIENT',
    email: 'test2@gmail.com',
    password: 'test',
    first_name: 'test2',
    last_name: 'client2',
  },
];
