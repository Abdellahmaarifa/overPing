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
    @Context() ctx,
    @Args('image', { type: () => GraphQLUpload, nullable: true })
    file?: FileUpload,
  ): Promise<string> {
    const { res } = ctx;
    const userId = res.user.id;
    return this.mediaService.updateAvatarImg(userId, file);
  }

  @Mutation(() => String)
  async updateProfileBgImg(
    @Context() ctx,
    @Args('image', { type: () => GraphQLUpload, nullable: true })
    file?: FileUpload,
  ): Promise<string> {
    const { res } = ctx;
    const userId = res.user.id;
    return this.mediaService.updateProfileBg(userId, file);
  }
}
