import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as FormData from 'form-data';
import * as fs from 'fs';

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

  async createFormData(filePath: string) {
    const formData = new FormData();
    formData.append('acc_token', process.env.GOFILE_ACCOUNT);
    formData.append('folder_Id', process.env.GOFILE_FOLDER);
    formData.append('file', fs.createReadStream(filePath));
    return formData;
  }

  async uploadFile(westernFile: string, easternFile: string) {
    const server = await this.getServer();
    const uploadUrl = `https://${server}.gofile.io/uploadFile`;

    const westernFormData = await this.createFormData(westernFile);
    const easternFormData = await this.createFormData(easternFile);

    const westernUpload = await this.httpService.axiosRef.post(
      uploadUrl,
      westernFormData,
      {
        headers: westernFormData.getHeaders(),
      },
    );

    const easternUpload = await this.httpService.axiosRef.post(
      uploadUrl,
      easternFormData,
      {
        headers: easternFormData.getHeaders(),
      },
    );

    return { westernUpload, easternUpload };
  }
}
