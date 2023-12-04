import { RpcExceptionService, PrismaError } from "@app/common/exception-handling";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "apps/profile/prisma/prisma.service";
import { UserProfile, Prisma } from "@prisma/client";
import { UpdateWalletDto } from "../dto/updateUserWalletDto";


@Injectable()
export class ProfileAttributesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly rpcExceptionService: RpcExceptionService,
  ) {}


//   async updateWallet(input: UpdateWalletDto) {
//     try {
//       await this.prisma.userProfile.update({
//         where: {
//           user_id: input.userId
//         },
//         data: {
//           wallet: { decrement: input.wager ?? 0 }
//         }
//       });
//     }
//     catch (error) {
//       this.rpcExceptionService.throwCatchedException({
//         code: 500,
//         message: "Failed to update wallet: Unknown error"
//       });
//     }
//   }

    

}