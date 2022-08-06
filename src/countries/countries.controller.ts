import { Controller, Get, Post, Query } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CovidCountriesDto } from './dto/covid-countries.dto';
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

  @Post()
  async createCountriesCsv(@Query() query: CountriesNames) {
    return await this.countriesService.convertFile(
      query.countryOne,
      query.countryTwo,
    );
  }
}
