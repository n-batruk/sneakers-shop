export const UserRoles = {
  CLIENT: "CLIENT",
  ADMIN: "ADMIN",
} as const;
export type UserRolesType = (typeof UserRoles)[keyof typeof UserRoles];

export type User = {
  id: string;
  account_role: UserRolesType;
  email: string;
  first_name?: string;
  last_name?: string;
};
