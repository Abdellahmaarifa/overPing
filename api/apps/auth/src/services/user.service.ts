import { Injectable } from '@nestjs/common';
import { PrismaService } from 'apps/auth/prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import { IAuthUser } from '../interface';
import { CredentialsUserInput } from '../dto'
@Injectable()
export class UserService{
    constructor(private prisma: PrismaService) {}

    async validateUser(userWhereUniqueInput: Prisma.UserWhereUniqueInput,): Promise<IAuthUser>{
        let found_user = await this.findUserByUsername(userWhereUniqueInput.username);
	console.log("auth: validateUser==> the user was found : ", found_user);
        if (!found_user){
            throw "user not found";
        }
        //TODO
        // validate the hashed password 
        const { password, ...user } = found_user;
        return (user);
    }


    async createUser(userinput: CredentialsUserInput): Promise<IAuthUser| null> {
        const { password, ...user} = await this.prisma.user.create({
            data : {
		username: userinput.username,
		password: userinput.password,
		googleId: userinput.googleId,
		fortyTwoId: userinput.fortyTwoId,
		createdAt: new Date(),
		updatedAt: new Date(), 
		
	    }

    });
        return user;
    }


    async findUserByUsername(username: string) : Promise<User | null>{
        const user = await (this.prisma.user.findUnique({
            where: {username}
        }));
        return (user);
    }
}
