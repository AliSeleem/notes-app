import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async logIn(email: string, password: string) {
    const user = await this.userModel.findOne({ email: email }).exec();
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const payload = { id: user._id, username: user.name };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signUp(name: string, email: string, password: string) {
    try {
      const existingUser = await this.userModel.findOne({ email }).exec();
      if (existingUser) {
        throw new Error('Email already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const createdUser = new this.userModel({
        name,
        email,
        password: hashedPassword,
      });
      await createdUser.save();

      const payload = { id: createdUser._id, username: createdUser.name };
      return { access_token: this.jwtService.sign(payload) };
    } catch (error) {
      console.log(error);
    }
  }

  async getUserById(userId: string) {
    return await this.userModel.findById(userId).lean().exec();
  }
}
