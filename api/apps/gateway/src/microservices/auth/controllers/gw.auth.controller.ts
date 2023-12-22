
import { Controller,Post, Get, Request, UseGuards , Ip, Res, UseFilters} from '@nestjs/common';
import { FortyTwoGuard } from '../guards/42.auth.grade';
import { GoogleGuard } from '../guards/google.auth.grad';
import { GatewayService} from '../services/gw.auth.service';
import { RefreshTokenGuard } from '../guards/refreshToken.guard';
import { JwtPayloadDto } from '@app/common/auth/dto/JwtPayloadDto';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
    constructor(
		private readonly gatewayService: GatewayService,
		private readonly configService: ConfigService,
		 ){}

    @UseGuards(FortyTwoGuard)
    @Get('42')
    async redirectToFortyTwoAuth(){}

    @UseGuards(FortyTwoGuard)
    @Get('42/fortytwo-callback')
    async fortyTwoAuthCallback(
	@Request() req,
	@Res() res,
    ){
		const user = req.user;
		const token = await this.gatewayService.getRefreshWithJwtAccessToken({id: req.user.id, username: req.user.username});
		res.cookie('Refresh_token', token.refreshToken, {
			httpOnly: true,
			secure: true,
			sameSite: 'Strict',
		  });
		  
		  res.cookie('Access_token', token.accessToken, {
			httpOnly: true,
			secure: true,
			sameSite: 'Strict',
		  });
		const FRONT_URL = this.configService.get('FRONT_URL')
		res.redirect(FRONT_URL);
    }



    @UseGuards(GoogleGuard)
    @Get('google')
    async redirectToGoogleAuth(){}


	/// refresh token are not stored in database------------------------------------------? i fix it 
	/// but check why the user can not sign from first time
    @UseGuards(GoogleGuard)
    @Get('google/google-callback')
    async GoogleoAuthCallback(
	@Request() req,
	@Res() res,
    ){
		console.log("Goooooooooooooooooogle")
		const user = req.user;
		const token = await this.gatewayService.getRefreshWithJwtAccessToken({id: req.user.id, username: req.user.username});
		res.cookie('Refresh_token', token.refreshToken, {
			httpOnly: true,
			secure: true,
			sameSite: 'Strict',
		  });
		  
		  res.cookie('Access_token', token.accessToken, {
			httpOnly: true,
			secure: true,
			sameSite: 'Strict',
		  });
		  const FRONT_URL = this.configService.get('FRONT_URL')
		  res.redirect(FRONT_URL);
    }


	@UseGuards(RefreshTokenGuard)
    @Get('refresh')
    async refresh(@Request() req : any, @Res() res): Promise<void>{
		const payload : JwtPayloadDto = {
			id : req.user.id,
			username : req.user.username
		}
		const resault =  await this.gatewayService.refresh(payload);
		console.log("res from the server: ", resault.Access_token);
		res.cookie('Access_token', resault.Access_token, {
			httpOnly: true,
			secure: true,
			sameSite: 'Strict',
		  });
		
		res.send(resault);
    }

}
