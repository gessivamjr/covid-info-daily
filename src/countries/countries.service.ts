import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  CountriesDocument,
  CountriesFiles,
} from './schemas/countries-files.schema';
import { CountriesHelper } from './helper/countries.helper';
import { CovidCountry } from './interfaces/countries.interface';
@Injectable()
export class CountriesService {
  constructor(
    @InjectModel(CountriesFiles.name)
    private countriesModel: Model<CountriesDocument>,
    private readonly httpService: HttpService,
  ) {}

  async fetchCountries(countryOne: string, countryTwo: string) {
    try {
      const response = await this.httpService.axiosRef.get(
        `https://disease.sh/v3/covid-19/countries/${countryOne}%2C%20${countryTwo}?yesterday=yesterday`,
      );
      const countriesData: CovidCountry[] = await response.data;
      return countriesData;
    } catch (error) {
      throw new Error('Cannot fetch countries from Disease API');
    }
  }

  async convertJson(countryOne: string, countryTwo: string) {
    try {
      const countries = await this.fetchCountries(countryOne, countryTwo);
      return await CountriesHelper.toCsv(countries);
    } catch (error) {
      throw new Error('Error while exporting file');
    }
  }

  async createMongoDocument(): Promise<CountriesFiles> {
    const westernCountriesFile = await this.convertJson('usa', 'brazil');
    const easternCountriesFile = await this.convertJson('russia', 'china');
    return await new this.countriesModel({
      westernFilename: westernCountriesFile.name,
      easternFilename: easternCountriesFile.name,
    }).save();
  }
}
