import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Countries, CountriesDocument } from './schemas/countries.schema';
import { CovidCountriesDto } from './dto/covid-country.dto';
import { CountriesHelper } from './helper/countries.helper';
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
      const countriesData: CovidCountriesDto[] = await response.json();
      const parsedCountries = CountriesHelper.insertDate(countriesData);
      return parsedCountries;
    } catch (error) {
      throw new Error('Cannot fetch countries from Disease API');
    }
  }

  async exportFile(countryOne: string, countryTwo: string) {
    try {
      const countries = await this.fetchCountries(countryOne, countryTwo);
      const exportData = await CountriesHelper.toCsv(countries);
      return exportData;
    } catch (error) {
      throw new Error('Error while exporting file');
    }
  }
}
