import { User } from "@/types/user.type";

export type LoginBody = {
  email: string;
  password: string;
};

export type RegisterBody = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export type AuthRes = {
  user: User;
  jwt: string;
};
