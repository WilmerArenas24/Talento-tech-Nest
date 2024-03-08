import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './users.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { promises } from 'dns';
@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });

    return newUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id);
  }
  
  async update(id: string, userDto: CreateUserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, userDto,{ new:true});
  }

  async delete(id: string): Promise<Boolean>{
 try {
   await this.userModel.findByIdAndDelete(id);
   return true;
  
 } catch (error) {
  throw new NotFoundException('User not found');
  
 }

  }
}