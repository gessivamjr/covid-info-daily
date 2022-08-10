import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CountriesService } from 'src/countries/countries.service';
import { GofileService } from 'src/gofile/gofile.service';

@Injectable()
export class TasksService {
  constructor(
    private readonly countriesService: CountriesService,
    private readonly gofileService: GofileService,
  ) {}
}
