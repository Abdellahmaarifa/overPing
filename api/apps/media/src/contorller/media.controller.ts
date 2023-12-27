import { Controller, Get } from '@nestjs/common';
import { MediaService } from '../services/media.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { FileUpload } from 'graphql-upload';

@Controller()
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  //=======================update img========================
  @MessagePattern({ role: 'file', cmd: 'update-avatar-img'})
  updateAavatarImg(file: any){
    return this.mediaService.updateAavatarImg(file);
  }

  @MessagePattern({ role: 'file', cmd: 'update-bgProfile-img'})
  updateProfileBg(file: any){
    return this.mediaService.updateProfileBgImg(file);
  }


  //==========================get image=====================
  @MessagePattern({ role: 'file', cmd: 'get-avatar-img'})
  async getAvatar(file: string){
    return this.mediaService.getAvatarImg(file);
  }

  @MessagePattern({ role: 'file', cmd: 'get-profileBg-img'})
  async getBgProfileImg(file: string){
    return this.mediaService.getBgProfileImg(file);
  }

  // @EventPattern({ role: 'file', cmd: 'upload-profile-img'})
  // uploadchatImg(file: FileUpload){
  //   this.mediaService.uploadchatImg(file);
  // }
   
}
