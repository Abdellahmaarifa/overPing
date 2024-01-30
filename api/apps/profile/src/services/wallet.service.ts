import { Injectable } from "@nestjs/common";
import { PrismaService } from "apps/profile/prisma/prisma.service";
import { Prisma } from "@prisma/client";
import { TransferFundsDto } from "../dto/transfer-funds.dto";
import { PlaceBetDto } from "../dto/place-bet.dto";
import { ResolveBetDto } from "../dto/resolve-bet.dto";
import { RpcExceptionService, PrismaError } from "@app/common/exception-handling";
import { Cron, CronExpression, } from '@nestjs/schedule';
@Injectable()
export class WalletService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly rpcExceptionService: RpcExceptionService
  ) { }

  async transferFunds(data: TransferFundsDto): Promise<boolean> {
    await this.prisma.$transaction(async () => {
      await this.updateWalletBalance(data.senderId, -data.amount);
      await this.updateWalletBalance(data.recipientId, data.amount);
    });
    return true;
  }

  async updateWalletBalance(userId: number, amount: number): Promise<void> {
    try {
      await this.prisma.wallet.update({
        where: { user_id: userId },
        data: { balance: { increment: amount } },
      });
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async placeBet(placeBetData: PlaceBetDto): Promise<boolean> {
    const wallet = await this.prisma.wallet.findUnique({
      where: { user_id: placeBetData.userId },
    });
    if (!wallet) {
      this.rpcExceptionService.throwBadRequest('wallet not found');
    }
    if (!wallet || wallet.balance < placeBetData.betAmount) {
      await this.prisma.wallet.update({
        where: { user_id: placeBetData.userId },
        data: { betAmount: 0},
      });
      this.rpcExceptionService.throwBadRequest('is not enough balace to bet with');
    }
    await this.prisma.wallet.update({
      where: { user_id: placeBetData.userId },
      data: { betAmount: placeBetData.betAmount },
    });
    return true;

  }

  async resolveBet(resolveBetData: ResolveBetDto): Promise<boolean> {
    try {
      const wallet = await this.prisma.wallet.findUnique({
        where: { user_id: resolveBetData.userId },
      });

      if (wallet?.betAmount && wallet.betAmount > 0) {
        const amountWonOrLost = resolveBetData.isWinner ? wallet.betAmount : -wallet.betAmount;

        await this.prisma.$transaction(async (prisma) => {
          await prisma.wallet.update({
            where: { user_id: resolveBetData.userId },
            data: { balance: { increment: amountWonOrLost }, betAmount: 0 },
          });
        });
        return (true);
      }
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async dailyDonation(): Promise<void> {
    const usersToUpdate = await this.prisma.wallet.findMany({
      where: {
        balance: {
          lt: 100,
        },
      },
    });

    for (const wallet of usersToUpdate) {
      await this.prisma.wallet.update({
        where: { id: wallet.id },
        data: {
          balance: wallet.balance + 500,
        },
      });
    }
  }

  private handlePrismaError(error: any): void {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      const prismaError = new PrismaError(error, this.rpcExceptionService);
      prismaError.handlePrismaError();
    } else {
      throw this.rpcExceptionService.throwInternalError('An unexpected error occurred');
    }
  }
}
