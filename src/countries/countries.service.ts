import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Countries, CountriesDocument } from './schemas/countries.schema';
import { CountriesHelper } from './helper/countries.helper';
import { CovidCountry } from './interfaces/countries.interface';
import fetch from 'node-fetch';
@Injectable()
export class CountriesService {
  constructor(
    @InjectModel(Countries.name)
    private countriesModel: Model<CountriesDocument>,
  ) {}

  async fetchCountries(countryOne: string, countryTwo: string) {
    try {
      const response = await fetch(
        `https://disease.sh/v3/covid-19/countries/${countryOne}%2C%20${countryTwo}?yesterday=yesterday`,
      );
      const countriesData: CovidCountry[] = await response.json();
      return CountriesHelper.insertDate(countriesData);
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

  async createDocument() {
    const westernCountriesFile = await this.convertJson('usa', 'brazil');
    const easternCountriesFile = await this.convertJson('russia', 'china');
    return await new this.countriesModel({
      westernFilename: westernCountriesFile.name,
      easternFilename: easternCountriesFile.name,
    }).save();
  }
}
