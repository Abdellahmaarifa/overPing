import { Controller, Get } from '@nestjs/common';
import { MediaService } from '../services/media.service';
import { EventPattern } from '@nestjs/microservices';
import { FileUpload } from 'graphql-upload';

@Controller()
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @EventPattern({ role: 'file', cmd: 'upload-profile-img'})
  uploadProfileImg(file: FileUpload){
    return this.mediaService.uploadProfileImg(file);
  }

  @EventPattern({ role: 'file', cmd: 'upload-profile-img'})
  uploadProfileBackgroundImg(file: FileUpload){
    return this.mediaService.uploadProfileBackgroundImg(file);
  }

  @EventPattern({ role: 'file', cmd: 'upload-profile-img'})
  uploadchatImg(file: FileUpload){
    this.mediaService.uploadchatImg(file);
  }
   
}
