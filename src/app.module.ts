import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { CountriesModule } from './countries/countries.module';
import { GofileModule } from './gofile/gofile.module';
import { JobsService } from './jobs/jobs.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    ScheduleModule.forRoot(),
    CountriesModule,
    GofileModule,
  ],
  controllers: [],
  providers: [JobsService],
})
export class AppModule {}
