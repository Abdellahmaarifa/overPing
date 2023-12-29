import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import {dirname, join } from 'path';
import { ConfigService } from '@nestjs/config';
import mime from 'mime';

@Injectable()
export class MediaService {
  private readonly logger = new Logger(MediaService.name);

  constructor(private readonly configService: ConfigService) {}

  async updateAavatarImg(file: {
    filename: string,
    mimetype: string,
    encoding: string;
    // buffer: { type: string; data: number[] };
    buffer: Buffer
  }): Promise<string> {
    const uploadDir = this.configService.get<string>('storage.useravatar.uploadDir');
    const imgName = await this.generateName(file.filename);
    await this.saveImg(uploadDir, imgName, file.buffer);
    return ("http://localhost:5500/image/avatar/" + imgName);
  }

  async updateProfileBgImg(file: {
    filename: string,
    mimetype: string,
    encoding: string;
    // buffer: { type: string; data: number[] };
    buffer: Buffer
  }): Promise<string> {
    const uploadDir = this.configService.get<string>('storage.profileBg.uploadDir');
    const imgName = await this.generateName(file.filename);
    await this.saveImg(uploadDir, imgName, file.buffer);
    return ("http://localhost:5500image/profileBackGound/" + imgName);
  }


  




  async getAvatarImg(fileId: string): Promise<Buffer> {
    const uploadDir = this.configService.get<string>('storage.useravatar.uploadDir');
    const filePath = join(uploadDir, `${fileId}`);
    // const mimeType = mime.getType(filePath) || 'application/octet-stream';
    // console.log("mimeType", mimeType);
    try {
      const fileBuffer = await fs.promises.readFile(filePath);
      return  fileBuffer;
    } catch (error) {
      this.logger.error(`File not found: ${error.message}`);
    }
  }

  async getBgProfileImg(fileId: string): Promise<Buffer> {
    const uploadDir = this.configService.get<string>('storage.profileBg.uploadDir');
    const filePath = join(uploadDir, `${fileId}`);
    // const mimeType = mime.getType(filePath) || 'application/octet-stream';
    // console.log("mimeType", mimeType);
    try {
      const fileBuffer = await fs.promises.readFile(filePath);
      return fileBuffer;
    } catch (error) {
      this.logger.error(`File not found: ${error.message}`);
    }
  }

  private async  saveImg(uploadDir : string, imgName: string, buffer: Buffer){
    const filePath = join(uploadDir, imgName);
    try {
      const bufferData = Buffer.from(buffer);
      await fs.promises.writeFile(filePath, bufferData);
    } catch (error) {
      this.logger.error(`Failed to upload file: ${error.message}`);
    }
  }

  private async generateName(filename: string){
    const fileId = uuidv4();
    //handle space in the filename
    const imgName = `${fileId}_${filename}`
    return imgName;
  }
}
