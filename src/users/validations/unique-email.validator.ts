import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UsersService } from '../users.service';

@ValidatorConstraint({ name: 'uniqueEmail', async: true })
@Injectable()
//implementacion de la interfaz
export class UniqueEmailValidator implements ValidatorConstraintInterface {
  //creando la instancia de usersService
  constructor(private readonly usersService: UsersService) {}

  async validate(email: string): Promise<boolean> {
    try {
      const existEmail = await this.usersService.findByEmail(email);
      if (!existEmail) {
        return false;
      }
      return true;
    } catch (e) {
      return false;
    }
  }

  defaultMessage(): string {
    return 'Email already exists';
  }
}