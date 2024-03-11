import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth/auth.service';
import * as dotenv from 'dotenv';

dotenv.config(); //Cargamos las variables de configuracion

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot(process.env.DB_URL),

  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}