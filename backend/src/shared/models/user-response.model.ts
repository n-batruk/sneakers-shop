import { UserRoles, User } from '@prisma/client';

export class UserResponseModel {
  public id: string;
  public account_role: UserRoles;
  public first_name: string;
  public last_name: string;
  public email: string;
  public created_at: Date;

  constructor(user: User) {
    this.id = user.id;
    this.account_role = user.role;
    this.created_at = user.created_at;
    this.email = user.email;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
  }
}
