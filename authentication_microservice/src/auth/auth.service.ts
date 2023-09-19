import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService, User } from 'src/database/users/users.service/users.service';
import { JwtService } from '@nestjs/jwt';
import RefreshToken from './entities/refresh-token.entity';
import { find } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  private refreshTokens : RefreshToken[] = [];

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUserName(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(
    user: any,
    values: { userAgent: string, ipAddress: string}) {
    const refreshAndAccessToken = await this.newRefreshAndAccessToken(user, values);
    return (
      {
        user : user,
        refreshToken: refreshAndAccessToken.refreshToken,
        accesstoken: refreshAndAccessToken.accessToken,
      }
    );
  }

 private async newRefreshAndAccessToken(
    user: User,
    values: { userAgent: string; ipAddress: string },
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const refreshObject = new RefreshToken(
      this.jwtService,
      {
      id:
        this.refreshTokens.length === 0
          ? 0
          : this.refreshTokens[this.refreshTokens.length - 1].id + 1,
      ...values,
      userId: user.id,
    });
    // add refreshObject to your db 
    this.refreshTokens.push(refreshObject);
    const payload = { username: user.username, sub: user.id };
    const access_secret = process.env.ACCESS_SECRET;
    return {
      refreshToken: await refreshObject.sign(),
      accessToken:  await this.jwtService.signAsync(payload,
         {secret: access_secret, expiresIn: '1h'},),
    };
  }
  findRefreshTokenById(idToFind: number): RefreshToken | undefined {
    return this.refreshTokens.find(token => token.id === idToFind);
  }
  async refresh(refreshToken: any): Promise<string | undefined> {
    // need to create this helper function.
    // const refreshToken = await this.retrieveRefreshToken(decoded);
    // if (!refreshToken) {
    //   return undefined;
    // }
    const token = this.findRefreshTokenById(refreshToken.id);

    // you should find the objt refreshtoken to check the user on it 
   const user = await this.usersService.findOne(token.userId);
   if (!user) {
    // remove the user from exception
    throw new UnauthorizedException('Invalid Jwt User');
   }
   
   // sign is imported from jsonwebtoken like import { sign, verify } from 'jsonwebtoken';
   const payload = { username: user.username, sub: user.id };
   const access_secret = process.env.ACCESS_SECRET;
  
   let accessToken: string = await this.jwtService.signAsync(
     payload,
     {secret: access_secret, expiresIn: '1h'},);
   return accessToken;
 }
 // find the object that loged in 
//  private retrieveRefreshToken(
  // decoded: any,
// ): Promise<RefreshToken | undefined> {
  // try {
    // verify is imported from jsonwebtoken like import { sign, verify } from 'jsonwebtoken';
    // const decoded = this.jwtService.verify(refreshStr, process.env.ACCESS_SECRET);
    // if (typeof decoded === 'string') {
    //   return undefined;
    // }
    // return Promise.resolve(
      // this.refreshTokens.find((token) => token.id === decoded.id),
    // );
  // } catch (e) {
  //   return undefined;
  // }
    // return undefined;
// }
// }


printRefreshTokens() {
  this.refreshTokens.forEach((token, index) => {
    console.log(`Refresh Token ${index + 1}:`, token);
  });
}
}
