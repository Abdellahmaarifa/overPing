import { Injectable } from '@nestjs/common';

export type User = {
    id: number;
    username: string;
    password: string;
}
@Injectable()
export class UsersService {
    private readonly users: User[] = [{
        id: 123,
        username: 'exampleuser',
        password: 'password123',
    },
    {
        id: 124,
        username: 'someone',
        password: 'someonepasswrod',
    }];
    async findOne(id: number): Promise<User | undefined> {
        return this.users.find(user => user.id === id);
    }

    async findByUserName(username: string): Promise<User | undefined> {
      return this.users.find(user => user.username === username);
    }

    async findOrCreateUser(profile: any){
            return (profile);
    }
}
