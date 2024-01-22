import { RpcExceptionService } from '@app/common/exception-handling';
import { Controller } from '@nestjs/common';
import { MessagePattern, EventPattern } from '@nestjs/microservices';
import { CreateProfileDto } from '../dto/createProfileDto';
import { UserProfile } from '@prisma/client';
import { ProfileService } from '../services/profile.service';
import { UpdateProfileDto } from '../dto/updateUserProfileDto';
import { IUserProfile } from '@app/common/profile/IUserProfile';
import { IAchievement } from '@app/common/profile/IAchievement';

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
  async findProfileByUserId(id: number) : Promise<IUserProfile>{
     return this.profileService.findOneByUserId(id);
  }

  @MessagePattern({role: 'profile', cmd: 'remove-Profile'})
  async removeProfile(userId: number) : Promise<boolean>{
    return this.profileService.remove(userId);
  }

  @MessagePattern({role: 'profile', cmd: 'get-user-achievements'})
  async getUserAchievements(userId: number): Promise<IAchievement[]> {
    return this.profileService.getUserAchievements(userId);
  }

  @MessagePattern({role: 'profile', cmd: 'get-all-achievements'})
  async getAllAchievements(): Promise<IAchievement[]> {
    return this.profileService.getAllAchievements();
  }

  @MessagePattern({ role: 'profile', cmd: 'get-users-nickname' })
  async getUsersNickname(userIds: any): Promise<{ user_id: number, nickname: string }[]> {
    return await this.profileService.getUsersNickname(userIds);
  }
}
