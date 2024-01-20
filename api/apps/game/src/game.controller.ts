import { MessageEvent  , Controller, Get } from '@nestjs/common';
import { GameService } from './game.service';
import { Body, Post } from '@nestjs/common';
import GameContainer from './component/gamecontainer';


@Controller()
export class GameController {
  constructor(
    private readonly gameService: GameService
  ) {}

  
}