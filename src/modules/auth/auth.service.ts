import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppLogger } from '../../common/logger/app.logger.service';
import { UserService } from '../users/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private logger: AppLogger,
  ) {
    this.logger.setContext(AuthService.name);
  }

  async signIn(username, pass) {
    const user = await this.userService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.userId, username: user.username };
    this.logger.logCluster('Login success');
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
