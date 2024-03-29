import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email, password) {
    const user = await this.usersService.findByEmail(email);
    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException();
    const payload = { sub: user.id, username: user.email };
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}
