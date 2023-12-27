import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { GWMediaService } from '../../services/gw.media.service';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@Resolver()
export class MediaMutationsResolver {
  constructor(private readonly mediaService: GWMediaService) {}

  @Mutation(() => String)
  async updateUserImg(
    @Context() ctx,
    @Args('image', { type: () => GraphQLUpload, nullable: true })
    file?: FileUpload,
  ): Promise<string> {
    const { res } = ctx;
    const userId = res.user.id;
    return this.mediaService.uploadProfileImg(userId, file);
  }

  @Mutation(() => String)
  async updateProfileBg(
    @Context() ctx,
    @Args('image', { type: () => GraphQLUpload, nullable: true })
    file?: FileUpload,
  ): Promise<string> {
    const { res } = ctx;
    const userId = res.user.id;
    return this.mediaService.uploadProfileImg(userId, file);
  }
}
