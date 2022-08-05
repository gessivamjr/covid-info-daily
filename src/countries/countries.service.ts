import { Injectable } from '@nestjs/common';
import { CovidCountryDto } from './dto/covid-country.dto';
import fetch from 'node-fetch';
import * as json2csv from 'json2csv';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';

@Injectable()
export class CountriesService {
  async fetchCountries(countryOne: string, countryTwo: string) {
    try {
      const response = await fetch(
        `https://disease.sh/v3/covid-19/countries/${countryOne}%2C%20${countryTwo}?yesterday=yesterday`,
      );
      const countriesData: CovidCountryDto[] = await response.json();
      return countriesData;
    } catch (error) {
      console.error('Cannot fetch countries from Disease API');
    }
  }

  async toCsv(data: CovidCountryDto[]) {
    const date = new Date().toString();
    const fields = [
      'country',
      'todayCases',
      'todayDeaths',
      `${date}`,
      'active',
      'critical',
    ];
    const options = { fields };
    const csv = await json2csv.parseAsync(data, options);
    const filename = uuidv4() + '.csv';
    fs.writeFile(`./src/countries/csv-exorts/${filename}`, csv, (err) => {
      if (err) {
        throw new Error('Error while writing file');
      }
    });
    return { msg: 'File created', name: `${filename}` };
  }

  async exportFile(countryOne: string, countryTwo: string) {
    const countries = await this.fetchCountries(countryOne, countryTwo);
    const exportData = await this.toCsv(countries);
    return exportData;
  }
}
