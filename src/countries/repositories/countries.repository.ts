import {
  CountriesDocument,
  CountriesFiles,
} from '../schemas/countries-files.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CountriesRepository {
  constructor(
    @InjectModel(CountriesFiles.name)
    private countriesModel: Model<CountriesDocument>,
  ) {}

  async create(
    westernFilename: string,
    easternFilename: string,
  ): Promise<CountriesFiles> {
    return await new this.countriesModel({
      westernFilename: westernFilename,
      easternFilename: easternFilename,
    }).save();
  }
}
