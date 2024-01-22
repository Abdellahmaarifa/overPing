import { HttpException } from "@nestjs/common";

export class UserCheckService {
  constructor() {}

  async validationId(id: number, ctxId: number) : Promise<void> {
    if (id !== ctxId) {
      throw new HttpException("premission denied", 404);
    }
  }
}
