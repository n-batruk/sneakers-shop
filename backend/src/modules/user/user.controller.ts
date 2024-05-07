import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JWTAuthGuard } from 'src/shared/guards/jwt.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { RolesGuard } from 'src/shared/guards/roles.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @UseGuards(JWTAuthGuard)
  public async getAllUsers(
    @Query('page') page: string,
    @Query('size') size: string,
  ) {
    return this.userService.getAllUsers(page, size);
  }
}
