import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import {dirname, join } from 'path';
import { ConfigService } from '@nestjs/config';
import mime from 'mime';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class MediaService {
  constructor(
    private readonly configService: ConfigService,
  ) {}

  async updateAavatarImg(file: {
    filename: string,
    mimetype: string,
    encoding: string;
    // buffer: { type: string; data: number[] };
    buffer: Buffer
  }): Promise<string> {
    const uploadDir = this.configService.get<string>('storage.useravatar.uploadDir');
    const url = this.configService.get<string>('URL.userAvatarUrl');
    const imgName = await this.generateName(file.filename);
    await this.saveImg(uploadDir, imgName, file.buffer);
    return (url + imgName);
  }

  async updateProfileBgImg(file: {
    filename: string,
    mimetype: string,
    encoding: string;
    // buffer: { type: string; data: number[] };
    buffer: Buffer
  }): Promise<string> {
    const uploadDir = this.configService.get<string>('storage.profileBg.uploadDir');
    const url = this.configService.get<string>('URL.profileBgUrl');
    const imgName = await this.generateName(file.filename);
    await this.saveImg(uploadDir, imgName, file.buffer);
    return (url + imgName);
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
      this.throwBadRequest("image not found");
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
      this.throwBadRequest("image not found");
    }
  }

  async getAchievementImg(fileId: string): Promise<Buffer> {
    const uploadDir = this.configService.get<string>('storage.achievement.uploadDir');
    const filePath = join(uploadDir, `${fileId}`);
    // const mimeType = mime.getType(filePath) || 'application/octet-stream';
    // console.log("mimeType", mimeType);
    // console.log(`filePath:`, filePath);
    try {
      const fileBuffer = await fs.promises.readFile(filePath);
      return fileBuffer;
    } catch (error) {
      this.throwBadRequest("image not found");
    }
  }

  private async  saveImg(uploadDir : string, imgName: string, buffer: Buffer){
    const filePath = join(uploadDir, imgName);
    try {
      const bufferData = Buffer.from(buffer);
      await fs.promises.writeFile(filePath, bufferData);
    } catch (error) {
      this.throwBadRequest("Failed to upload image");
    }
  }

  private async generateName(filename: string){
    const fileId = uuidv4();
    //handle space in the filename
    const imgName = `${fileId}_${filename}`
    return imgName;
  }


  throwBadRequest(customErrorMessage?: string): RpcException {
    throw new RpcException({
        statusCode: 400,
        errorStatus: customErrorMessage || 'Bad Request',
    });
}
}
