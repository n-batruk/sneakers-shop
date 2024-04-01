import { type User } from '@prisma/client';
import type { Request } from 'express';

// export type SignUpProps = { file: Express.Multer.File } & (
//   | {
//       body: SignUpClientDto;
//       account_role: typeof AccountRoles.CLIENT;
//     }
//   | {
//       body: SignUpPractitionerDto;
//       account_role: typeof AccountRoles.PRACTITIONER;
//     }
// );

// export type SignUpReturn = {
//   user: UserResponseModel;
//   jwt: string;
//   message: string;
// };

// export type SignInReturn = {
//   user: UserResponseModel;
//   jwt: string;
//   message: string;
// };

export type AuthRequest = Request & {
  auth: boolean;
  user?: User;
};

export type CheckIsAuthReturn = {
  auth: boolean;
};
