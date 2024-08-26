import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role } from '../roles/roles.decorator';

// This is a mock implementation, in a real application you should use environment variables to store the secret
export const JWT_SECRET = 'SHREK';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async signIn(username: string, pass: string): Promise<any> {
    // This is a mock implementation, in a real application you should call the database to validate the user
    const users = [
      {
        userId: 1,
        username: 'admin',
        password: 'admin',
        role: Role.Admin,
      },
      {
        userId: 2,
        username: 'user',
        password: 'user',
        role: Role.User,
      },
    ];

    const user = users.find((user) => user.username === username);

    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user.userId,
      username: user.username,
      role: user.role,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
