import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-42';

@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy, '42'){
    constructor(){
        super({
            clientID: process.env.FORTYTWO_APP_ID,
            clientSecret: process.env.FROTYTWO_APP_SECRET,
            callbackURL:  'http://localhost:3000/auth/42/fortytwo-callback/',  
        })
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        ){  
            console.log(profile);
            const user = {
                username: profile.username,
                displayName: profile.displayName,
                emails: profile.emails,
            }
            return ({
                // accessToken,
                // refreshToken,
                user
            })
    }
}