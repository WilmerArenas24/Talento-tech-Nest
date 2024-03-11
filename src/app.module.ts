import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth/auth.controller';

import * as dotenv from 'dotenv';

dotenv.config(); //Cargamos las variables de configuracion

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot(process.env.DB_URL),

  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}