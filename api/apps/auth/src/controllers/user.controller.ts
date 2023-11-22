import { Controller } from '@nestjs/common';

import { MessagePattern } from '@nestjs/microservices';
import { UserService } from '../services/user.service';
import { CredentialsUserInput } from '../dto'
import { IAuthUser } from '../interface';
import { IRespondMessagePattern } from '@app/rabbit-mq'
import { RpcExceptionService } from '@app/common/exception-handling';
@Controller()
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly rpcExceptionService: RpcExceptionService,
	) { }


	@MessagePattern({ role: 'user', cmd: 'create-user' })
	async registerUser(userInput: CredentialsUserInput): Promise<IRespondMessagePattern> {
		console.log("auth==========> starting teh create of the user user:", userInput);
		const user = await this.userService.createUser(userInput);
		if (user)
			console.log('auth==========> the user was created: ', user);

		return ({
			data: { user },
			message: 'user created successful'
		});
	}

	//TODO change the uername to dto 
	@MessagePattern({ role: 'user', cmd: 'find-user-by-username' })
	async findUserbyUsername(username: string): Promise<IAuthUser> {
		console.log("auth==========> starting teh finding of the user user:", username);
		const user = await this.userService.findUserByUsername(username);
		if (!user) {
			this.rpcExceptionService.throwCatchedException({
				code: 500,
				message: (`Failed to find user: ${username}`)
			})
		}
		return (user);
	}


	@MessagePattern({ role: 'user', cmd: 'findById' })
	async findById(id: number): Promise<IAuthUser> {
		const user = await this.userService.findById(id);
		if (!user) {
			this.rpcExceptionService.throwCatchedException({
				code: 500,
				message: (`Failed to find user: ${id}`)
			})
		}
		return (user);
	}

	@MessagePattern({ role: 'user', cmd: 'findAll' })
	async findAll(): Promise<IAuthUser[]> {
		const users: IAuthUser[] = await this.userService.findAll();
		if (!users) {
			this.rpcExceptionService.throwCatchedException({
				code: 500,
				message: ("Failed to query users")
			})
		}
		return (users);
	}

	@MessagePattern({ role: 'user', cmd: 'delete-user' })
	async remove(id: number): Promise<boolean> {
		return this.userService.remove(id);
	}

}