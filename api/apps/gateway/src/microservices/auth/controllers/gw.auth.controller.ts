
import { Controller,Post, Get, Request, UseGuards , Ip, Res, UseFilters} from '@nestjs/common';
import { FortyTwoGuard } from '../guards/42.auth.grade';
import { GoogleGuard } from '../guards/google.auth.grad';
import { GatewayService} from '../services/gw.auth.service';
import { Cookies } from 'apps/gateway/src/decortor/cookies.decorator';
import { RefreshTokenGuard } from '../guards/refreshToken.guard';
import { GetAccessTokenDto } from '@app/common/auth/dto/getAccessTokenDto';

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
		const user = req.user;
		const token = await this.gatewayService.getRefreshWithJwtAccessToken({id: req.user.id, username: req.user.username});
		console.log("the token", token);
		const access_token = token.accessToken;

		res.setHeader('Set-Cookie', `access_token="${access_token}"; Path=/; HttpOnly`);
		res.redirect(`http://localhost:3000/userinfo?user=${encodeURIComponent(JSON.stringify(user))}`);
    }


	@UseGuards(RefreshTokenGuard)
    @Get('refresh')
    async refresh(@Request() req : any): Promise<string>{
		const payload : GetAccessTokenDto = {
			id : req.user.id,
			username : req.user.username
		}
		const result =  await this.gatewayService.refresh(payload);
		console.log("gateway ===========> result: [", result, "]");
		return (result);
    }

}
