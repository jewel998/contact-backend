import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayload, sign, verify } from 'jsonwebtoken';

@Injectable()
export class TokenService {
  private signer = 'zomato';
  private secret!: string;
  private refreshTokenExpiry = 24 * 60 * 60 * 1000;
  private accessTokenExpiry = 5 * 60 * 1000;
  constructor(private readonly config: ConfigService) {
    this.secret = this.config.get<string>('TOKEN_SECRET') ?? 'BqKWEbVRkY';
  }

  private genRefreshToken(uid: string, sid: string) {
    return sign({ uid, sid }, this.secret, {
      issuer: this.signer,
      subject: 'refresh',
      expiresIn: this.refreshTokenExpiry,
    });
  }

  genAccessToken(uid: string, sid: string, scopes: string[]) {
    return sign({ uid, sid, scopes }, this.secret, {
      issuer: this.signer,
      subject: 'access',
      expiresIn: this.accessTokenExpiry,
    });
  }

  getTokens(userId: string, sessionId: string, scopes: string[]) {
    const refreshToken = this.genRefreshToken(userId, sessionId);
    const accessToken = this.genAccessToken(userId, sessionId, scopes);

    return [refreshToken, accessToken];
  }

  verifyAccessToken(token: string) {
    return verify(token, this.secret, { issuer: this.signer }) as JwtPayload & {
      uid: string;
      sid: string;
      scopes: string[];
    };
  }

  verifyRefreshToken(token: string) {
    return verify(token, this.secret, { issuer: this.signer }) as JwtPayload & {
      uid: string;
      sid: string;
    };
  }
}
