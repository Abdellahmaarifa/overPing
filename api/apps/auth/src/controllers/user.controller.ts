import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserService } from '../services/user.service';
import { UserCreationDto } from '../dto';
import { IAuthUser } from '@app/common/auth/interface/auth.user.interface';
import { RpcExceptionService } from '@app/common/exception-handling';
import { UpdateProfileDto } from '../dto/user.updateProfileId.dto';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly rpcExceptionService: RpcExceptionService,
  ) {}

  @MessagePattern({ role: 'user', cmd: 'create-user' })
  async registerUser(userInput: UserCreationDto): Promise<IAuthUser> {
    return await this.userService.createUser(userInput);
  }

  @MessagePattern({ role: 'user', cmd: 'find-user-by-username' })
  async findUserByUsername(username: string): Promise<IAuthUser> {
    const user = await this.userService.findUserByUsername(username);
    this.handleUserNotFound(user, `Failed to find user: ${username}`);
    return user;
  }

  @MessagePattern({ role: 'user', cmd: 'findById' })
  async findById(id: number): Promise<IAuthUser> {
    const user = await this.userService.findById(id);
    this.handleUserNotFound(user, `Failed to find user: ${id}`);
    return user;
  }

  @MessagePattern({ role: 'user', cmd: 'findAll' })
  async findAll(): Promise<IAuthUser[]> {
    const users: IAuthUser[] = await this.userService.findAll();
    this.handleUsersNotFound(users, 'Failed to query users');
    return users;
  }

  @MessagePattern({ role: 'user', cmd: 'delete-user' })
  async remove(id: number): Promise<boolean> {
    return this.userService.remove(id);
  }


  private handleUserNotFound(user: IAuthUser, errorMessage: string): void {
    if (!user) {
      this.rpcExceptionService.throwCatchedException({
        code: 500,
        message: errorMessage,
      });
    }
  }

  private handleUsersNotFound(users: IAuthUser[], errorMessage: string): void {
    if (!users) {
      this.rpcExceptionService.throwCatchedException({
        code: 500,
        message: errorMessage,
      });
    }
  }
}
