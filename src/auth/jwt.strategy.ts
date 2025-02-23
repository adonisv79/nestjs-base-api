/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import {
  APIConfigurations,
  AuthConfigurations,
} from './../../config/api.configuration';
import * as jwksRsa from 'jwks-rsa'; // Import JWKS

interface JwtPayload {
  sub: string; // Auth0 user identifier
  name: string; // You can change this based on the claims from Auth0
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(readonly configService: ConfigService) {
    const authConfig = configService.get<AuthConfigurations>('auth')!;
    const apiConfig = configService.get<APIConfigurations>('api')!;

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKeyProvider: jwksRsa.passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksUri: `${authConfig.domainUri}/.well-known/jwks.json`,
      }),
      audience: apiConfig.url,
      issuer: authConfig.domainUri + '/', // Do not forget the trailing slash as Auth0 provides it this way
    });
  }

  validate(payload: JwtPayload) {
    console.log('sadas');
    return { userId: payload.sub, username: payload.name }; // Attach user info to the request
  }
}
