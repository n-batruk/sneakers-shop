import { UserRoles } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';

export type CreateUserSeedType = CreateUserDto & { role: UserRoles };
