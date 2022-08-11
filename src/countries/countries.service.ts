import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CountriesHelper } from './helper/countries.helper';
import { CovidCountry } from './interfaces/countries.interface';
import { CountriesRepository } from './repositories/countries.repository';
@Injectable()
export class CountriesService {
  constructor(
    private readonly httpService: HttpService,
    private readonly countriesRepository: CountriesRepository,
  ) {}

  async fetchCountries(countryOne: string, countryTwo: string) {
    try {
      const response = await this.httpService.axiosRef.get(
        `https://disease.sh/v3/covid-19/countries/${countryOne}%2C%20${countryTwo}?yesterday=yesterday`,
      );
      const countriesData: CovidCountry[] = await response.data;
      return CountriesHelper.insertDate(countriesData);
    } catch (error) {
      throw new Error('Cannot fetch countries from Disease API');
    }
  }

  async convertJson(countriesJson: CovidCountry[]) {
    try {
      return await CountriesHelper.toCsv(countriesJson);
    } catch (error) {
      throw new Error('Error while exporting file');
    }
  }

  async registerFilenames(westernFilename: string, easternFilename: string) {
    return await this.countriesRepository.create(
      westernFilename,
      easternFilename,
    );
  }
}
