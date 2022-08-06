import { Controller, Get, Post, Query } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountriesNames } from './interfaces/countries.interface';

@Controller('countries')
export class CountriesController {
  constructor(private countriesService: CountriesService) {}

  @Get()
  async getCountries(@Query() query: CountriesNames) {
    return await this.countriesService.fetchCountries(
      query.countryOne,
      query.countryTwo,
    );
  }

  @Post('/create-csv/')
  async createCountriesCsv(@Query() query: CountriesNames) {
    return await this.countriesService.convertJson(
      query.countryOne,
      query.countryTwo,
    );
  }

  @Post('/store-csv/')
  async storeCsvFiles() {
    return await this.countriesService.createDocument();
  }
}
