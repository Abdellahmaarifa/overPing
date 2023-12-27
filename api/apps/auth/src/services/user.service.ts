import { Injectable } from '@nestjs/common';
import { IAuthUser } from '@app/common/auth/interface/auth.user.interface';
import { UserCreationDto } from '../dto';
import { PrismaService } from 'apps/auth/prisma/prisma.service';
import * as argon2 from 'argon2';
import { SignInCredentialsDto } from '../dto';
import { RpcExceptionService } from '@app/common/exception-handling';
import { UpdateProfileDto } from '../dto/user.updateProfileId.dto'; 
import {User, Prisma } from "@prisma/client";
import { PrismaError } from '@app/common/exception-handling';
import { UpdateUserDto } from '../dto/user.update.dto';

@Injectable()
export class UserService {
	constructor(
		private readonly rpcExceptionService: RpcExceptionService,
		private prisma: PrismaService
	) { }

	async validateUser(userCredentials: SignInCredentialsDto): Promise<IAuthUser | null> {
		let userFound = await this.findUserByUsername(userCredentials.username);
		if (!userFound) {
			this.rpcExceptionService.throwNotFound("User not found. Check the provided username.");
		}
		const isPasswordValid = await argon2.verify(
			userFound.password,
			userCredentials.password,
		);
		if (!isPasswordValid)
			this.rpcExceptionService.throwForbidden("Invalid username or password.");

		if (userFound.twoStepVerificationEnabled){
			return null;
			// this.rpcExceptionService.throwUnauthorised("Two-factor authentication is required. Please provide the 2FA code.")
		}
		return (userFound);
	}

	async createUser({ password, username, googleId, fortyTwoId, email }: UserCreationDto): Promise<IAuthUser> {
		const exists = await this.isUserExist(username);
		if (exists){
			throw this.rpcExceptionService.throwBadRequest(`Resource already exists`);
		}
		  
		try {
			console.log("the error: ", password, username);
			const hashedPassword = password ? await argon2.hash(password) : undefined;

			const currentDate = new Date();

			return this.prisma.user.create({
				data: {
					username,
					email,
					password: hashedPassword,
					googleId,
					fortyTwoId,
					twoFactorSecret: "",
					twoStepVerificationEnabled: false,
					createdAt: currentDate,
					updatedAt: currentDate,

				},
				select: {
					id: true,
					email: true,
					username: true,
					googleId: true,
					fortyTwoId: true,
					twoStepVerificationEnabled: true,
					createdAt: true,
					updatedAt: true,
				},
			});
		} catch (error) {
			this.handlePrismaError(error);
		}
	}



	async findUserByUsername(username: string): Promise<User> {
		try {
			const user = await (this.prisma.user.findUnique({
				where: { username }
			}));
			return (user);
		} catch (error) {
			this.handlePrismaError(error);
		}
	}


	async findById(id: number) {
		try {
			const user = await this.prisma.user.findUnique({
				where: { id }
			});

			return (user);

		} catch (error) {
			this.handlePrismaError(error);
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
			this.handlePrismaError(error);
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

	async update2FA(id: number, secret: string){
		return this.prisma.user.update({
			where: { id },
			data: {
				twoFactorSecret : secret
			}
		});
	}


	async toggle2FAStatus(id: number, state: boolean){
		return this.prisma.user.update({
			where: { id },
			data: {
				twoStepVerificationEnabled : state
			}
		});
	}

	private handlePrismaError(error: any): void {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
		  const prismaError = new PrismaError(error, 'An unexpected error occurred', this.rpcExceptionService);
		  prismaError.handlePrismaError();
		} else {
		  throw this.rpcExceptionService.throwInternalError('An unexpected error occurred');
		}
	  }
	
	private async isUserExist(username: string) : Promise<boolean>{
		const exists = !!await this.prisma.user.findFirst(
			{
			  where: {
				username: username
			  }
			}
		  );
		return(exists);
	}
	private async isUserExistById(id: number) : Promise<boolean>{
		const exists = !!await this.prisma.user.findFirst(
			{
			  where: {
				id
			  }
			}
		  );
		return(exists);
	}


	async updateUser(userId: number , input: UpdateUserDto) : Promise<boolean>{
		const exists = await this.isUserExistById(userId);
		if (!exists){
			this.rpcExceptionService.throwBadRequest(`User with ID ${userId} not found.`)
		}
		const user =  await this.prisma.user.update({
			where: { id : userId },
			data: input
		});

		if (!user){
			return false;
		}
		return true;
	}
}
