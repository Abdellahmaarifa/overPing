export type User = {
    id: number;
    username: string;
    password: string;
};
export declare class UsersService {
    private readonly users;
    findOne(id: number): Promise<User | undefined>;
    findByUserName(username: string): Promise<User | undefined>;
    findOrCreateUser(profile: any): Promise<any>;
}
