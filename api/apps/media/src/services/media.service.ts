import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import {dirname, join } from 'path';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MediaService {
  private readonly logger = new Logger(MediaService.name);

  constructor(private readonly configService: ConfigService) {
    console.log("pwd ", process.cwd())
  }

  async uploadProfileImg(file: {
    filename: string,
    mimetype: string,
    encoding: string;
    // buffer: { type: string; data: number[] };
    buffer: Buffer
  }): Promise<string> {
    const uploadDir = this.configService.get<string>('storage.local.uploadDir');
    const fileId = uuidv4();
    //handle space in the filename
    const imgName = `${fileId}_${file.filename}`
    const filePath = join(uploadDir, imgName);


    try {
      const bufferData = Buffer.from(file.buffer);
      await fs.promises.writeFile(filePath, bufferData);
      return imgName;
    } catch (error) {
      this.logger.error(`Failed to upload file: ${error.message}`);
      throw new Error('Failed to upload file');
    }
  }

  async getFileUrl(fileId: string): Promise<Buffer> {
    const uploadDir = this.configService.get<string>('storage.local.uploadDir');
    const filePath = join(uploadDir, `${fileId}`);
    console.log("filePath:", filePath);

    try {
      const fileBuffer = await fs.promises.readFile(filePath);
      return fileBuffer;
    } catch (error) {
      this.logger.error(`File not found: ${error.message}`);
      throw new Error('File not found');
    }
  }
}
