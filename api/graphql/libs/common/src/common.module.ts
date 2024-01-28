import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { LoggerService } from './user.loger.service';

@Module({
    providers: [
	CommonService,
	LoggerService,
    ],
    exports: [
	CommonService,
	LoggerService,
    ],
})
export class CommonModule {}
