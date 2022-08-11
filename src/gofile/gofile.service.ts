import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as FormData from 'form-data';
import * as fs from 'fs';
import { FilePath } from 'src/countries/interfaces/countries.interface';

@Injectable()
export class GofileService {
  constructor(private readonly httpService: HttpService) {}

  async getServer(): Promise<string> {
    const response = await this.httpService.axiosRef.get(
      'https://api.gofile.io/getServer',
    );
    const serverData = await response.data;
    return await serverData.data.server;
  }

  async createFormData(filepath: string, filename: string) {
    const formData = new FormData();
    formData.append('token', process.env.GOFILE_ACCOUNT);
    formData.append('folderId', process.env.GOFILE_FOLDER);
    formData.append('filepath', fs.createReadStream(filepath));
    formData.append('filename', filename);
    return formData;
  }

  async uploadFile(westernFile: FilePath, easternFile: FilePath) {
    const server = await this.getServer();
    const uploadUrl = `https://${server}.gofile.io/uploadFile/`;

    const westernFormData = await this.createFormData(
      westernFile.path,
      westernFile.name,
    );
    const easternFormData = await this.createFormData(
      easternFile.path,
      easternFile.name,
    );

    const westernUpload = await this.httpService.axiosRef.post(
      uploadUrl,
      westernFormData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    );

    const westernFileData = await westernUpload.data;

    const easternUpload = await this.httpService.axiosRef.post(
      uploadUrl,
      easternFormData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    );

    const easternFileData = await easternUpload.data;

    return { westernFileData, easternFileData };
  }

  async removeLocalFile(filepath: string) {
    return fs.rm(filepath, (err) => {
      if (err) throw new Error(`Error while removing ${filepath}`);
    });
  }
}
