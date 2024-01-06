import { Injectable, Inject } from '@nestjs/common';
import { IRmqSeverName } from '@app/rabbit-mq/interface/rmqServerName';
import { ClientProxy } from '@nestjs/microservices';
import { RabbitMqService } from '@app/rabbit-mq';
import { FileUpload } from 'graphql-upload';
import { UserService } from '../../auth/services';
import { GwProfileService } from '../../../microservices/profile/services/gw.profile.service';

@Injectable()
export class GWMediaService {
  constructor(
    @Inject(IRmqSeverName.MEDIA)
    private client: ClientProxy,
    private readonly clientService: RabbitMqService,
    private readonly userService: UserService,
    private readonly profileService: GwProfileService,
  ) {}

  //======================update image======================
  async updateAvatarImg(userId, file: FileUpload): Promise<string> {
    const { filename, mimetype, encoding } = file;

    const resolvedBuffer = await this.convertStreamToBuffer(file);
    const imgUrl = await this.clientService.sendMessageWithPayload(
      this.client,
      {
        role: 'file',
        cmd: 'update-avatar-img',
      },
      {
        userId,
        filename,
        mimetype,
        encoding,
        buffer: resolvedBuffer,
      },
    );
    this.userService.updateUser(userId, {
      profileImgUrl: imgUrl,
    });

    return imgUrl;
  }

  async updateProfileBg(userId, file: FileUpload): Promise<string> {
    const { filename, mimetype, encoding } = file;
    
    const resolvedBuffer = await this.convertStreamToBuffer(file);
    const imgUrl = await this.clientService.sendMessageWithPayload(
      this.client,
      {
        role: 'file',
        cmd: 'update-bgProfile-img',
      },
      {
        userId,
        filename,
        mimetype,
        encoding,
        buffer: resolvedBuffer,
      },
    ); 
    this.profileService.updateUserProfile(userId, {
      bgImageUrl: imgUrl,
    })

    return imgUrl;
  }


///====================get image =====================

  async getAvatarImg(fileName: string) : Promise<Buffer>{
    return this.clientService.sendMessageWithPayload(
      this.client,
      {
        role: 'file',
        cmd: 'get-avatar-img'
      },
      fileName
    )
  }


  async getPorfileBgImg(fileName: string) : Promise<Buffer>{
    return this.clientService.sendMessageWithPayload(
      this.client,
      {
        role: 'file',
        cmd: 'get-profileBg-img'
      },
      fileName
    )
  }

  async getAchievementImg(fileName: string) : Promise<Buffer>{
    return this.clientService.sendMessageWithPayload(
      this.client,
      {
        role: 'file',
        cmd: 'get-achievement-img'
      },
      fileName
    )
  }




  private async convertStreamToBuffer(fileStream: FileUpload) {
    const { createReadStream, filename, mimetype, encoding } = await fileStream;

    // Process the file stream into a buffer
    const stream = createReadStream();
    const chunks: Uint8Array[] = [];

    const buffer = new Promise<Buffer>((resolve, reject) => {
      stream
        .on('data', (chunk) => chunks.push(chunk))
        .on('end', () => resolve(Buffer.concat(chunks)))
        .on('error', reject);
    });
    return buffer;
  }
}
