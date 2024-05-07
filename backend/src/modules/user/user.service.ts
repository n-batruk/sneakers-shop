import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateUserDto } from './dto/create-user.dto';
import { SALT_ROUNDS } from 'src/shared/constants/salt-rounds.conts';
import * as bcrypt from 'bcrypt';
import { CreateUserSeedType } from './user.type';
import { User } from '@prisma/client';
import { UserResponseModel } from 'src/shared/models/user-response.model';
import {
  PaginateFunction,
  PaginatedResult,
  paginator,
} from 'src/shared/utils/paginator.util';

const paginate: PaginateFunction = paginator({ perPage: 6 });

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getAllUsers(
    page: string,
    size: string,
  ): Promise<PaginatedResult<UserResponseModel>> {
    const result = await paginate<User, any>(
      this.prismaService.user,
      {
        where: {
          role: {
            not: 'ADMIN',
          },
        },
      },
      {
        page,
        perPage: size,
      },
    );
    return {
      meta: result.meta,
      data: result.data.map((user) => new UserResponseModel(user)),
    };
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: email.toLowerCase(),
      },
    });
    return user;
  }

  public async checkIsEmailAlreadyInUse(email: string): Promise<void> {
    const user = await this.findByEmail(email.toLowerCase());

    if (user) {
      throw new BadRequestException('Email already in use!');
    }
  }

  public async validateUser(email: string, password: string): Promise<User> {
    const user = await this.findByEmail(email);

    if (!user) {
      throw new BadRequestException('There is no user with this email address');
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      throw new BadRequestException('Wrong password');
    }

    return user;
  }

  public async createClientUser(dto: CreateUserDto): Promise<User> {
    const { email, password, first_name, last_name } = dto;
    const hashedPassword = await bcrypt.hash(password.trim(), SALT_ROUNDS);
    return this.prismaService.user.create({
      data: {
        role: 'CLIENT',
        email: email.trim().toLowerCase(),
        first_name: first_name.trim().slice(0, 50),
        last_name: last_name.trim().slice(0, 50),
        password: hashedPassword,
      },
    });
  }

  public async deleteUserById(userId: string): Promise<User> {
    return this.prismaService.user.delete({
      where: {
        id: userId,
      },
    });
  }

  public async createSeedUsers(dtos: CreateUserSeedType[]) {
    const createData: CreateUserSeedType[] = [];
    const users = await this.prismaService.user.findMany({
      where: {
        email: {
          in: dtos.map((dto) => dto.email.toLowerCase()),
        },
      },
    });
    const newDtos = dtos.filter(
      (dto) => !users.find((user) => user.email === dto.email.toLowerCase()),
    );
    for (const newDto of newDtos) {
      const hashedPassword = await bcrypt.hash(
        newDto.password.trim(),
        SALT_ROUNDS,
      );
      createData.push({
        ...newDto,
        email: newDto.email.trim().toLowerCase(),
        first_name: newDto.first_name.trim().slice(0, 50),
        last_name: newDto.last_name.trim().slice(0, 50),
        password: hashedPassword,
      });
    }
    return this.prismaService.user.createMany({
      data: createData,
    });
  }

  public async changeJwtByUserId(
    userId: string,
    newJwt: string | null,
  ): Promise<User> {
    return this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        jwt: newJwt,
      },
    });
  }
}
