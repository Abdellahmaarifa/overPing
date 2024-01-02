import { Module } from "@nestjs/common";
import { GwChannelService, GwDirectMessageService } from "./services";

@Module({
  providers: [
    GwDirectMessageService,
    GwChannelService,
  ],
})
export class GWChatModule {}
