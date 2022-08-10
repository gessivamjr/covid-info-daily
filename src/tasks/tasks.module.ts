import { Module } from '@nestjs/common';
import { CountriesService } from 'src/countries/countries.service';
import { GofileService } from 'src/gofile/gofile.service';

@Module({
  providers: [GofileService, CountriesService],
})
export class TasksModule {}
