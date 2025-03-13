import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LoginDto } from './dto/login.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async logIn(@Body() loginDto: LoginDto) {
    return this.userService.logIn(loginDto.email, loginDto.password);
  }

  @Post('signup')
  async signUp(@Body() registerDto: RegisterDto) {
    const { name, email, password } = registerDto;
    return this.userService.signUp(name, email, password);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Req() req) {
    return this.userService.getUserById(req.user.id.toString())
  }
}
