import { RpcExceptionService } from '@app/common/exception-handling';
import { Controller } from '@nestjs/common';
import { MessagePattern, EventPattern } from '@nestjs/microservices';
import { CreateProfileDto } from '../dto/createProfileDto';
import { UserProfile } from '@prisma/client';
import { ProfileService } from '../services/profile.service';
import { UpdateProfileDto } from '../dto/updateUserProfileDto';
import { IUserProfile } from '@app/common/profile/IUserProfile';

@Controller()
export class ProfileController {
  constructor(
    private readonly profileService : ProfileService,
  ) {}

  @MessagePattern({role: 'profile', cmd: 'create-profile'})
  async createUserProfile(payload: CreateProfileDto) : Promise<UserProfile> {
       return await this.profileService.create(payload);
  }

  @MessagePattern({role: 'profile', cmd: 'update-profile'})
  async updateUserProfile(data: {userId: number, updateInput: UpdateProfileDto}): Promise<boolean>{
    return await this.profileService.update(data.userId, data.updateInput);
  }

  @MessagePattern({role: 'profile', cmd: 'find-Profile'})
  async findProfileById(id: number) : Promise<IUserProfile>{
    return this.profileService.findOne(id);
  }

  @MessagePattern({ role: 'profile', cmd: 'find-profile-by-userId'})
  async findProfileByUserId(userId: number) : Promise<IUserProfile>{
     return this.profileService.findOneByUserId(userId);
  }
  @MessagePattern({role: 'profile', cmd: 'remove-Profile'})
  async removeProfile(userId: number) : Promise<boolean>{
    return this.profileService.remove(userId);
  }

}
