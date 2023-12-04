import { Injectable } from "@nestjs/common";
import { PrismaService } from "apps/profile/prisma/prisma.service";
import { Prisma } from "@prisma/client";
import { TransferFundsDto } from "../dto/transfer-funds.dto";
import { PlaceBetDto } from "../dto/place-bet.dto";
import { ResolveBetDto } from "../dto/resolve-bet.dto";
import { RpcExceptionService, PrismaError } from "@app/common/exception-handling";

@Injectable()
export class WalletService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly rpcExceptionService: RpcExceptionService
  ) {}

  async transferFunds(data: TransferFundsDto): Promise<boolean> {
    await this.prisma.$transaction(async () => {
      await this.updateWalletBalance(data.senderId, -data.amount);
      await this.updateWalletBalance(data.recipientId, data.amount);
    });
    return true;
  }

  private async updateWalletBalance(walletId: number, amount: number): Promise<void> {
    try {
      await this.prisma.wallet.update({
        where: { id: walletId },
        data: { balance: { increment: amount } },
      });
    } catch (error) {
        this.handlePrismaError(error);
    }
  }

  async placeBet(placeBetData: PlaceBetDto): Promise<boolean> {
    try{
    await this.prisma.wallet.update({
      where: { id: placeBetData.walletId },
      data: { betAmount: { increment: placeBetData.betAmount } },
    });
    return true;
  }catch(error){
    this.handlePrismaError(error);
  }
  }

  async resolveBet(resolveBetData: ResolveBetDto): Promise<boolean> {
    try{
    const wallet = await this.prisma.wallet.findUnique({
      where: { id: resolveBetData.walletId },
    });

    if (wallet?.betAmount && wallet.betAmount > 0) {
      const amountWonOrLost = resolveBetData.isWinner ? wallet.betAmount : -wallet.betAmount;

      await this.prisma.$transaction(async (prisma) => {
        await prisma.wallet.update({
          where: { id: resolveBetData.walletId },
          data: { balance: { increment: amountWonOrLost }, betAmount: 0 },
        });
      });
      return (true);
    }
  }catch(error){
    this.handlePrismaError(error);
  }
  }

  private handlePrismaError(error: any): void {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      const prismaError = new PrismaError(error, 'An unexpected error occurred', this.rpcExceptionService);
      prismaError.handlePrismaError();
    } else {
      throw this.rpcExceptionService.throwInternalError('An unexpected error occurred');
    }
  }
}
