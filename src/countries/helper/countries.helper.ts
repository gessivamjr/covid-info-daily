import * as json2csv from 'json2csv';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import { CovidCountry, CsvFilePath } from '../interfaces/countries.interface';

export class CountriesHelper {
  static insertDate(countries: CovidCountry[]) {
    const parseCountries = countries.map((country) => {
      country.date = new Date().toDateString();
      return country;
    });
    return parseCountries;
  }
  static async toCsv(data: CovidCountry[]): Promise<CsvFilePath> {
    const fields = [
      'country',
      'todayCases',
      'todayDeaths',
      'date',
      'active',
      'critical',
    ];
    const options = { fields };

    try {
      const csv = await json2csv.parseAsync(data, options);
      const filename = uuidv4() + '.csv';
      const file = `./src/countries/exports/${filename}`;

      fs.writeFile(file, csv, (err) => {
        if (err) {
          throw new Error('Error while writing file');
        }
      });
      return { name: filename, path: file };
    } catch (error) {
      throw new Error('Error to convert json');
    }
  }
}
