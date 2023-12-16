
import { IsBoolean, IsEnum, IsNumber, IsPositive, Max, Validate } from "class-validator";
import { MatchMode } from "./gameModeInterface";


export class MatchResultDto {
  @IsNumber()
  user_id: number;

  @IsNumber()
  @IsPositive()
  score_for: number;

  @IsNumber()
  @IsPositive()
  score_against: number;

  @IsBoolean()
  is_winner: boolean;

  @IsNumber()
  bet: number;

  @IsEnum(MatchMode)
  matchMode: MatchMode;

  /* For Achievements Statistics */

  @IsNumber()
  @IsPositive()
  strict_shot_goals: number;

  @IsNumber()
  @IsPositive()
  rebounded_goals: number;

  @IsNumber()
  @IsPositive()
  starts_collected: number
}