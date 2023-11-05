import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-42';
import { UserService } from '../services';

@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy, '42'){
    constructor(
        private readonly userService: UserService
    ){
        super({
            clientID: process.env.FORTYTWO_APP_ID,
            clientSecret: process.env.FROTYTWO_APP_SECRET,
            callbackURL:  'http://localhost:5500/auth/42/fortytwo-callback/',  
        })
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        ){ 
            const user = {
                fortyTwoId: profile.id,
                username: profile.username,
                displayName: profile.displayName,
                emails: profile.emails,
            }
            const account = await this.userService.findOrCreateUser(user);
            return (account);
    }
}
