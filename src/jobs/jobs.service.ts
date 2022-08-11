import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CountriesService } from 'src/countries/countries.service';
import { GofileService } from 'src/gofile/gofile.service';

@Injectable()
export class JobsService {
  constructor(
    private readonly countriesService: CountriesService,
    private readonly gofileService: GofileService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_10PM)
  async handleCron() {
    const westernData = await this.countriesService.fetchCountries(
      'usa',
      'brazil',
    );

    const easternData = await this.countriesService.fetchCountries(
      'russia',
      'china',
    );

    const westernCsvFile = await this.countriesService.convertJson(westernData);
    const easternCsvFile = await this.countriesService.convertJson(easternData);

    await this.countriesService.registerFilenames(
      westernCsvFile.name,
      easternCsvFile.name,
    );

    return await this.gofileService.uploadFile(westernCsvFile, easternCsvFile);
  }
}
