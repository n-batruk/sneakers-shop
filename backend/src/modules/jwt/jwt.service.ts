import * as jwt from 'jsonwebtoken';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { JWTPayload } from './jwt.types';
import { TOKEN_EXPIRATION } from './jwt.const';

@Injectable()
export class JWTService {
  private readonly jwtPrivateKey: string;

  constructor(private readonly configService: ConfigService) {
    this.jwtPrivateKey = this.configService
      .getOrThrow('JWT_PRIVATE_KEY')
      .replace(/\\n/g, '\n');
  }

  public generateJWTToken(id: string): string {
    const privateKey = this.jwtPrivateKey;
    const payload: JWTPayload = {
      sub: id,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + TOKEN_EXPIRATION,
    };

    return jwt.sign(payload, privateKey, {
      algorithm: 'RS256',
    });
  }

  public validateJWTToken(token: string, publicKey?: string): boolean {
    let isValid = false;

    jwt.verify(
      token,
      publicKey ?? '',
      {
        algorithms: ['RS256'],
      },
      (err, decoded) => {
        if (err) {
          throw new BadRequestException('Invalid token');
        }

        isValid = Boolean(decoded);
      },
    );
    return isValid;
  }

  public decodeJWTToken(token: string): JWTPayload {
    return jwt.decode(token) as JWTPayload;
  }
}
 