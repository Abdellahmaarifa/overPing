import { Injectable, Inject } from '@nestjs/common';
import { IRmqSeverName } from '@app/rabbit-mq/interface/rmqServerName';
import { ClientProxy } from '@nestjs/microservices';
import { RabbitMqService } from '@app/rabbit-mq';
import { FileUpload } from 'graphql-upload';

@Injectable()
export class GWMediaService {
  constructor(
    @Inject(IRmqSeverName.MEDIA)
    private client: ClientProxy,
    private readonly clientService: RabbitMqService,
  ) {}

  async uploadProfileImg(file: FileUpload) : Promise<string> {
    const { createReadStream, filename, mimetype, encoding } = await file;
  
    // Process the file stream into a buffer
    const stream = createReadStream();
    const chunks: Uint8Array[] = [];
  
    const buffer = new Promise<Buffer>((resolve, reject) => {
      stream
        .on('data', (chunk) => chunks.push(chunk))
        .on('end', () => resolve(Buffer.concat(chunks)))
        .on('error', reject);
    });
  
    // Wait for the buffer promise to resolve
    const resolvedBuffer = await buffer;
  
     const imgUrl = await  this.clientService.sendMessageWithPayload(
      this.client,
      {
        role: 'file',
        cmd: 'upload-profile-img',
      },
      {
        filename,
        mimetype,
        encoding,
        buffer: resolvedBuffer,
      },
    );
    
    return (imgUrl);
  }

  async getFileUrl(fileUrl: string) : Promise<Buffer>{
    return this.clientService.sendMessageWithPayload(
        this.client,
        {
            role: 'file',
            cmd: 'get-profile-img',
        },
        fileUrl
    )
  }
  
}
