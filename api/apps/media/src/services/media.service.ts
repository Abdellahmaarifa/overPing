// import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { FileUpload } from 'graphql-upload';

// @Injectable()
export class MediaService {
  constructor(private readonly prisma: PrismaClient) {}

  async uploadProfileImg(file: FileUpload): Promise<String> {
    const { createReadStream, filename, mimetype, encoding } = file;
    const stream = createReadStream();

    const buffer = await new Promise<Buffer>((resolve, reject) => {
      const chunks: Uint8Array[] = [];
      stream.on('data', (chunk) => chunks.push(chunk));
      stream.on('end', () => resolve(Buffer.concat(chunks)));
      stream.on('error', (error) => reject(error));
    });

    const result = await this.prisma.profileImg.create({
      data: {
        imgKey: 'something for now',
        filename,
        mimetype,
        encoding,
        content: buffer,
      },
    });

    return result.imgKey;
  }

  uploadProfileBackgroundImg(file: FileUpload) {}
  uploadchatImg(file: FileUpload) {}
}
