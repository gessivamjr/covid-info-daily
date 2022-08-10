import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CountriesService } from './countries.service';
import {
  CountriesFiles,
  CountriesSchema,
} from './schemas/countries-files.schema';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: CountriesFiles.name, schema: CountriesSchema },
    ]),
  ],
  controllers: [],
  providers: [CountriesService],
})
export class CountriesModule {}
