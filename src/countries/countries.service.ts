import { Injectable } from '@nestjs/common';
import { CovidCountryDto } from './dto/covid-country.dto';
import fetch from 'node-fetch';

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
}
