
import { StreamableFile ,Controller,Post, Get, Request, UseGuards ,Param, Ip, Res, UseFilters} from '@nestjs/common';
import { GWMediaService } from '../services/gw.media.service';
import { ConfigService } from '@nestjs/config';
import { createReadStream } from 'fs';
import { buffer } from 'stream/consumers';
import { Response } from 'express';


@Controller('image')
export class MeidaController {
    constructor(
		private readonly mediaService: GWMediaService,
		private readonly configService: ConfigService,
		 ){}

    @Get(':imageName')
    async getProfileImg(@Res() res: Response, @Param('imageName') imageName: string, ){
        const imageBuffer = await this.mediaService.getFileUrl(imageName);
        
        const mimeType = 'image/png';

        res.setHeader('Content-Type', mimeType);
        res.send(Buffer.from(imageBuffer))


    }

}