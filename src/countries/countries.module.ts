import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';
import {
  CountriesFiles,
  CountriesSchema,
} from './schemas/countries-files.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CountriesFiles.name, schema: CountriesSchema },
    ]),
  ],
  controllers: [CountriesController],
  providers: [CountriesService],
})
export class CountriesModule {}
