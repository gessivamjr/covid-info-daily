import { CovidCountriesDto } from '../dto/covid-country.dto';

export class CountriesHelper {
  static insertDate(countries: CovidCountriesDto[]) {
    const parseCountries = countries.map((country) => {
      country.date = new Date().toDateString();
      return country;
    });
    return parseCountries;
  }
}
