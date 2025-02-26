import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async logIn(@Body() loginDto: CreateUserDto) {
    return this.userService.logIn(loginDto.email, loginDto.password);
  }

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;
    return this.userService.signUp(name, email, password);
  }
}
