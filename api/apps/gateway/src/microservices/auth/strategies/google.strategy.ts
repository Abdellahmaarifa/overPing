import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-google-oauth20';
import { UserService } from '../services/user.service'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google'){
    constructor(
        private readonly userService: UserService,
    ){
        super({
            clientID: process.env.GOOGLE_APP_ID,
            clientSecret: process.env.GOOGLE_APP_SECRET,
            callbackURL:  process.env.GOOGLE_REDIRECT_URL,
            scope: ['profile', 'email'],
        })
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        ){  
            const email = profile.emails[0].value;
            const username =  email.split('@')[0];
            const userAccount = {
                    googleId: profile.id,
                    username:  username,
                    displayName: profile.displayName,
                    emails: profile.emails,
            }
            console.log("gateway=======> prepare for the validate the user: the input is ", userAccount);
            const account = await this.userService.findOrCreateUser(userAccount);
           return (account);
    }   
}