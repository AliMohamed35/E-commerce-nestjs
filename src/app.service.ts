import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  login() {
    const accessToken = 'kefe kda';
    return accessToken;
  }
}
