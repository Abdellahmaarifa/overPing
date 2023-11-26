
import { Controller,Post, Get, Request, UseGuards , Ip, Res, UseFilters} from '@nestjs/common';
import { FortyTwoGuard } from '../guards/42.auth.grade';
import { GoogleGuard } from '../guards/google.auth.grad';
import { GatewayService} from '../services/gw.auth.service';
import { Cookies } from 'apps/gateway/src/decortor/cookies.decorator';
import { RefreshTokenGuard } from '../guards/refreshToken.guard';
import { JwtPayloadDto } from '@app/common/auth/dto/JwtPayloadDto';

@Controller('auth')
export class AuthController {
    constructor(private readonly gatewayService: GatewayService ){}

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
		res.redirect(`http://localhost:3000/userinfo?user=${encodeURIComponent(JSON.stringify(user))}`);
    }



    @UseGuards(GoogleGuard)
    @Get('google')
    async redirectToGoogleAuth(){}


	/// refresh token are not stored in database------------------------------------------?
    @UseGuards(GoogleGuard)
    @Get('google/google-callback')
    async GoogleoAuthCallback(
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
		res.redirect(`http://localhost:3000/userinfo?user=${encodeURIComponent(JSON.stringify(user))}`);
    }


	@UseGuards(RefreshTokenGuard)
    @Get('refresh')
    async refresh(@Request() req : any): Promise<string>{
		const payload : JwtPayloadDto = {
			id : req.user.id,
			username : req.user.username
		}
		const result =  await this.gatewayService.refresh(payload);
		console.log("gateway ===========> result: [", result, "]");
		return (result);
    }

}
