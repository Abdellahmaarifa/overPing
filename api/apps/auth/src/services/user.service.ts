import { Injectable } from '@nestjs/common';
import { IAuthUser } from '../interface';
import { CredentialsUserInput } from '../dto'
// import { LoggerService } from '@app/common/loger'
import { User } from '@prisma/client';
import { PrismaService } from 'apps/auth/prisma/prisma.service';
import * as argon2 from 'argon2'

import { RpcExceptionService } from '@app/common/exception-handling';
@Injectable()
export class UserService {
	constructor(
		// private readonly loger: LoggerService,
		private readonly rpcExceptionService: RpcExceptionService,
		private prisma: PrismaService
	) { }

	async validateUser(userWhereUniqueInput: any): Promise<IAuthUser> {
		let found_user = await this.findUserByUsername(userWhereUniqueInput.username);
		console.log("auth: validateUser   ==> the user was found : ", found_user);
		if (!found_user) {
			this.rpcExceptionService.throwNotFound("User not found. Check the provided username.");
		}
		const isPasswordValid = await argon2.verify(
			found_user.password,
			userWhereUniqueInput.password,
		);

		if (!isPasswordValid)
			this.rpcExceptionService.throwForbidden("Invalid username or password.");
		const { password, ...user } = found_user;
		return (user);
	}


	async createUser({ password, username, googleId, fortyTwoId }: CredentialsUserInput): Promise<IAuthUser> {
		try {
			const hashedPassword = password ? await argon2.hash(password) : undefined;

			const currentDate = new Date();

			return this.prisma.user.create({
				data: {
					username,
					password: hashedPassword,
					googleId,
					fortyTwoId,
					createdAt: currentDate,
					updatedAt: currentDate,
				},
				select: {
					id: true,
					username: true,
					googleId: true,
					fortyTwoId: true,
					createdAt: true,
					updatedAt: true,
				},
			});
		} catch (error) {
			this.rpcExceptionService.throwCatchedException({
				code: 500,
				message: ("Failed to create user: Unknown error")
			})
		}
	}



	async findUserByUsername(username: string): Promise<User> {
		try {
			const user = await (this.prisma.user.findUnique({
				where: { username }
			}));
			return (user);
		} catch (error) {
			this.rpcExceptionService.throwCatchedException({
				code: 500,
				message: ("Failed to find user: Unknown error")
			})
		}
	}


	async findById(id: number) {
		try {
			const user = await this.prisma.user.findUnique({
				where: { id }
			});
			
			return (user);

		} catch (error) {
			this.rpcExceptionService.throwCatchedException({
				code: 500,
				message: ("Failed to find user: Unknown error")
			})
		}
	}

	async findAll(): Promise<IAuthUser[]> {
		return await this.prisma.user.findMany({
			select: {
				id: true,
				username: true,
				// Exclude the 'password' field from the query result
				password: false,
				googleId: true,
				fortyTwoId: true,
				createdAt: true,
				updatedAt: true,

			},
		}) as IAuthUser[];
	}


	

	async remove(id: number): Promise<boolean> {
		try {
		  const userToDelete = await this.prisma.user.findUnique({
			where: {
			  id: id,
			},
		  });
	  
		  if (!userToDelete) {

			this.rpcExceptionService.throwBadRequest(`User with ID ${id} not found.`)
		  }
	  
		  // Delete the user if it exists
		  await this.prisma.user.delete({
			where: {
			  id: id,
			},
		  });
		  return (true);
	  
		} catch (error) {
			this.rpcExceptionService.throwCatchedException({
				code: 500,
				message: (`Failed to delete user: ${id}`)
			})
		}
	  }
	  

	async updateRefreshToken(userId: number, refreshToken: string) {
		return this.prisma.user.update({
			data: {
				refreshToken: refreshToken,
			},
			where: { id: userId },
		});
	}

}
