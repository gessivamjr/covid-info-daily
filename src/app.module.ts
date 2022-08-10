import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { CountriesModule } from './countries/countries.module';
import { GofileModule } from './gofile/gofile.module';
import { TasksService } from './tasks/tasks.service';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    ScheduleModule.forRoot(),
    CountriesModule,
    GofileModule,
    TasksModule,
  ],
  controllers: [],
  providers: [TasksService],
})
export class AppModule {}
