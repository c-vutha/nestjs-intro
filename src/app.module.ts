import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductModule } from './products/products.module';

import { AppController } from './app.controller';

import { AppService } from './app.service';

const mongoURI =
  'mongodb+srv://nestjs:Pld9wbItFETQIYf9@cluster0-luaof.mongodb.net/nestdemo?retryWrites=true&w=majority';

@Module({
  imports: [ProductModule, MongooseModule.forRoot(mongoURI)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
