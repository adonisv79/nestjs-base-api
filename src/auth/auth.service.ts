import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { AuthConfigurations } from '../../config/api.configuration';

@Injectable()
export class AuthService {
  private readonly auth0UserInfoPath: string;
  constructor(config: ConfigService) {
    const authConfig = config.get<AuthConfigurations>('auth')!;
    this.auth0UserInfoPath = `${authConfig.domainUri}/userinfo`;
  }

  async getCurrentUserAuth0Info(accessToken: string) {
    console.log(`token: ${accessToken}`);
    const response = await axios.get(this.auth0UserInfoPath, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.data) {
      throw new NotFoundException();
    }
    return response.data as unknown;
  }
}
