
import { Controller, Get, Request, UseGuards , Ip, Res} from '@nestjs/common';
import { FortyTwoGuard } from '../guards/42.auth.grade';
import { GoogleGuard } from '../guards/google.auth.grad';
import { UserService } from '../services';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService){}

  @Get('hello')
  async hello(){
    return await this.userService.findUserByUsername("some"); 
  }

  @UseGuards(FortyTwoGuard)
  @Get('42')
  async redirectToFortyTwoAuth(){}

  @UseGuards(FortyTwoGuard)
    @Get('42/fortytwo-callback')
    async fortyTwoAuthCallback(
     @Request() req,
     @Ip() ip: string,
     @Res() res,
     ){
    //  const result = await this.authService.login(
    //     req.user,
    //     {
    //       ipAddress: ip,
    //       userAgent: req.headers['user-agent'],
    //     });
    //     res.cookie('refresh_token', result.refreshToken, {
    //       httpOnly: true,
    //       secure: true,
    //       sameSite: 'Strict',
    //     });
    //    return res.send({
    //     user: result.user,
    //     accessToken: result.accesstoken,
    //    })
    return res.send(req.user);
  }



  @UseGuards(GoogleGuard)
  @Get('google')
  async redirectToGoogleAuth(){}

  //TODO
  // Create a custom parameter decorator
  @UseGuards(GoogleGuard)
    @Get('google/google-callback')
    async GoogleoAuthCallback(
     @Request() req,
     @Ip() ip: string,
     @Res() res,
     ){
    //  const result = await this.authService.login(
    //     req.user,
    //     {
    //       ipAddress: ip,
    //       userAgent: req.headers['user-agent'],
    //     });
    //     res.cookie('refresh_token', result.refreshToken, {
    //       httpOnly: true,
    //       secure: true,
    //       sameSite: 'Strict',
    //     });
    //    return res.send({
    //     user: result.user,
    //     accessToken: result.accesstoken,
    //    })
    console.log("req--------> ",req);
    return res.send(req.user);
  }




}
