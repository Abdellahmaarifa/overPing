import { Controller, Get } from '@nestjs/common';
import { MediaService } from '../services/media.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { FileUpload } from 'graphql-upload';

@Controller()
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @MessagePattern({ role: 'file', cmd: 'upload-profile-img'})
  uploadProfileImg(file: any){
    return this.mediaService.uploadProfileImg(file);
  }

  @MessagePattern({ role: 'file', cmd: 'get-profile-img'})
  async getFileUrl(file: string){
    return this.mediaService.getFileUrl(file);
  }

  // @EventPattern({ role: 'file', cmd: 'upload-profile-img'})
  // uploadchatImg(file: FileUpload){
  //   this.mediaService.uploadchatImg(file);
  // }
   
}
