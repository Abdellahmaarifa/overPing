import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserService } from '../services/user.service';
import { UserCreationDto } from '../dto';
import { IAuthUser, IUser } from '@app/common/auth/interface/auth.user.interface';
import { RpcExceptionService } from '@app/common/exception-handling';
import { UpdateProfileDto } from '../dto/user.updateProfileId.dto';
import { UpdateUserDto } from '../dto/user.update.dto';
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

  @MessagePattern({ role: 'user', cmd: 'findUserById' })
  async findUserById({userId , id}): Promise<IUser> {
    const user = await this.userService.findUserById(userId, id);
    this.handleUserNotFound(user, `Failed to find user: ${id}`);
    return user;
  }

  @MessagePattern({ role: 'user', cmd: 'findAllUsers' })
  async findAllUsers({pageNumber, pageSize, userId}): Promise<IAuthUser[]> {
    const users = await this.userService.findAllUsers(pageNumber,pageSize, userId);
    this.handleUsersNotFound(users, 'Failed to query users');
    return users;
  }

  

  @MessagePattern({ role: 'user', cmd: 'delete-user' })
  async remove(input: { id: number; password: string }): Promise<boolean> {
    return this.userService.remove(input.id, input.password);
  }

  @MessagePattern({ role: 'user', cmd: 'update' })
  async updateUser(input : { id : number , data: UpdateUserDto}): Promise<boolean> {
    return this.userService.updateUser(input.id, input.data);
  }

  @MessagePattern({role: 'user', cmd: 'findUsersByIds'})
  async findUsersByIds(friendIds: number[]): Promise<IAuthUser[]> {
    return this.userService.findUserByIds(friendIds);
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
