import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

// This is a mock implementation, in a real application you should use environment variables to store the secret
export const JWT_SECRET = 'SHREK';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async signIn(_username: string, pass: string): Promise<any> {
    // This is a mock implementation, in a real application you should call the database to validate the user
    const user = { userId: 1, username: 'admin', password: 'admin' };

    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.userId, username: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
