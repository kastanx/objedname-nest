import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Sign in' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully signed in',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() authLoginDto: AuthLoginDto) {
    return this.authService.signIn(
      authLoginDto.username,
      authLoginDto.password,
    );
  }
}
