import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CountriesModule } from './countries/countries.module';
import { GofileModule } from './gofile/gofile.module';

@Module({
  imports: [
    CountriesModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    GofileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
