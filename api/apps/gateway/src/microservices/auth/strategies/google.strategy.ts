import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-google-oauth20';
import { UserService } from '../services/gw.user.service'

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
            const profilePicture = profile.photos && profile.photos.length > 0 ? profile.photos[0].value : null;
            const email = profile.emails[0].value;
            const username =  email.split('@')[0];
            const userAccount = {
                    googleId: profile.id,
                    username:  username,
                    email: email,
                    displayName: profile.displayName,
                    imgUrl: profilePicture
            }
            const account = await this.userService.findOrCreateUser(userAccount);
           return (account);
    }   
}