import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { HousesController } from './houses/houses.controller';
import { HousesService } from './houses/houses.service';
import { HousesModule } from './houses/houses.module';

import * as dotenv from 'dotenv';

dotenv.config(); //Cargamos las variables de configuracion

@Module({
  imports: [UsersModule, MongooseModule.forRoot(process.env.DB_URL), HousesModule],
  controllers: [AppController, HousesController],
  providers: [AppService, HousesService],
})
export class AppModule {}
