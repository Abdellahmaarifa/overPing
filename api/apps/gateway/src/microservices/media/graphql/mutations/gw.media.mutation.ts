import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { GWMediaService } from '../../services/gw.media.service';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from '../../../auth/guards/accessToken.guard';

@Resolver()
export class MediaMutationsResolver {
  constructor(private readonly mediaService: GWMediaService) {}


  @UseGuards(AccessTokenGuard)
  @Mutation(() => String)
  async updateUserAvatarImg(
    @Args('userId') userId: number,
    @Args('image', { type: () => GraphQLUpload })
    file?: FileUpload,
  ): Promise<string> {
    return this.mediaService.updateAvatarImg(userId, file);
  }

  @UseGuards(AccessTokenGuard)
  @Mutation(() => String)
  async updateProfileBgImg(
    @Args('userId') userId: number,
    @Args('image', { type: () => GraphQLUpload })
    file?: FileUpload,
  ): Promise<string> {
    return this.mediaService.updateProfileBg(userId, file);
  }
}
