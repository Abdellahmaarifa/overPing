import { Entity } from 'typeorm';

@Entity()
export class GameStat {
  game_won:          number;
  game_played:       number;
  tournament_played: number;
  tournament_won:    number;
  win_streak:        number;
  best_win_streak:   number
}