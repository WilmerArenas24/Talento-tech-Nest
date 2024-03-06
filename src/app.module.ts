import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';

dotenv.config(); //cargamos las variables de configuracion

@Module({
  imports: [UsersModule,MongooseModule.forRoot(process.env.DB_URL)],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
