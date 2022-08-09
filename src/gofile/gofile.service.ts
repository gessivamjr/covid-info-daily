import { Injectable } from '@nestjs/common';
import * as FormData from 'form-data';

@Injectable()
export class GofileService {
  async getServer(): Promise<string> {
    const response = await fetch('https://api.gofile.io/getServer');
    const data = await response.json();
    const server = await data.data.server;
    return server;
  }

  createFormData(targetFile: any) {
    const formData = new FormData();
    formData.append('acc_token', process.env.GOFILE_ACCOUNT);
    formData.append('folder_Id', process.env.GOFILE_FOLDER);
    formData.append('buffer', new Buffer(10));
    formData.append('file', targetFile);
    return formData;
  }

  async uploadFile(westernFile: string, easternFile: string) {
    const server = await this.getServer();
    const uploadUrl = `https://${server}.gofile.io/uploadFile`;

    const westernFormData = this.createFormData(westernFile);
    const easternFormData = this.createFormData(easternFile);

    const westernUpload = await fetch(uploadUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      body: JSON.stringify(westernFormData),
    });

    const easternUpload = await fetch(uploadUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      body: JSON.stringify(easternFormData),
    });

    return { westernUpload, easternUpload };
  }
}
