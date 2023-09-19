
import { Controller, Get, Request, Post, UseGuards , Ip, Res, Body} from '@nestjs/common';
import { AccessTokenGuard } from './guards/accessToken.guard';
import { LocalAuthGuard } from './guards/local.auth.grade';
import { FortyTwoGuard } from './guards/42.auth.grade';
import { AuthService } from './auth.service';
import { RefreshTokenGuard } from './guards/refreshToken.guard';
import { LoginDto } from './dto/loginDto';
import { GoogleGuard } from './guards/google.auth.grad';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req,@Body() user: LoginDto, @Ip() ip: string) {
    return this.authService.login(
      user,
      {
        ipAddress: ip,
        userAgent: req.headers['user-agent'],
      });
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
     const result = await this.authService.login(
        req.user,
        {
          ipAddress: ip,
          userAgent: req.headers['user-agent'],
        });
        res.cookie('refresh_token', result.refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'Strict',
        });
       return res.send({
        user: result.user,
        accessToken: result.accesstoken,
       })
  }



  @UseGuards(GoogleGuard)
  @Get('google')
  async redirectToGoogleAuth(){}

  @UseGuards(GoogleGuard)
    @Get('google/google-callback')
    async GoogleoAuthCallback(
     @Request() req,
     @Ip() ip: string,
     @Res() res,
     ){
     const result = await this.authService.login(
        req.user,
        {
          ipAddress: ip,
          userAgent: req.headers['user-agent'],
        });
        res.cookie('refresh_token', result.refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'Strict',
        });
       return res.send({
        user: result.user,
        accessToken: result.accesstoken,
       })
  }


  // just for testing should moved to user
  @UseGuards(AccessTokenGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return ("req.user");
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  async refresh(@Request() req){
    return this.authService.refresh(req.user);
  }

}
