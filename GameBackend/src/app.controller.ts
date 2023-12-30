import { MessageEvent  , Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Body, Post } from '@nestjs/common';
import GameContainer from './component/gamecontainer';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}