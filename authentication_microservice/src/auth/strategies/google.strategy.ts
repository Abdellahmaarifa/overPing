import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google'){
    constructor(){
        super({
            clientID: process.env.GOOGLE_APP_ID,
            clientSecret: process.env.GOOGLE_APP_SECRET,
            callbackURL:  'http://localhost:3000/auth/google/google-callback/',
            scope: ['profile', 'email'],
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