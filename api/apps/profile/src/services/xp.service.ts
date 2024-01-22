
import { Injectable } from '@nestjs/common';
import { MatchMode } from '../dto/gameModeInterface';
import { UserTitle } from '../interface/title.user.interface';

@Injectable()
export class XpService {

  // Maps different prize amounts to corresponding XP values.
  private prizeToXpMap = new Map<number, number>([
    [200, 51],
    [1000, 80],
    [2000, 82],
    [5000, 95],
    [10000, 105],
    [20000, 110],
    [50000, 123],
    [100000, 154],
    [200000, 182],
    [400000, 201],
  ]);

  // Each match mode associated with a multiplier factor that affects the XP calculation.
  private matchModeMultipliers = {
    [MatchMode.VS_COMPUTER]: 0.8,
    [MatchMode.VS_FRIENDS]: 1.0,
    [MatchMode.ONLINE_RANDOM]: 1.2,
    [MatchMode.TOURNAMENT]: 2.0,
  };

  calculateXp(prize: number, matchMode: MatchMode): number {
    // Calculate the XP earned based on the prize amount and the selected match mode.
    const baseXp = this.prizeToXpMap.get(prize) || 0;
    const multiplier = this.matchModeMultipliers[matchMode] || 1.0;

    return baseXp * multiplier;
  }
}

@Injectable()
export class TitleService {
  private titleRequirements = [
    { xp: 32000, title: UserTitle.APEX_VANGUARD_01 },
    { xp: 26000, title: UserTitle.VIRTUOSO_WARLORD_02 },
    { xp: 21000, title: UserTitle.Maestro_Dominator_03 },
    { xp: 16500, title: UserTitle.Legend_Conqueror_04 },
    { xp: 12500, title: UserTitle.Elite_Battlemaster_05 },
    { xp: 9000, title: UserTitle.Master_Sentinel_06 },
    { xp: 6000, title: UserTitle.Prodigy_Valor_07 },
    { xp: 3500, title: UserTitle.Ace_Gladiator_08 },
    { xp: 1500, title: UserTitle.Veteran_09 },
    { xp: 0, title: UserTitle.Challenger_10 },
  ];

  getUserTitle(xp: number, old_title: string): string {
    const matchingRequirement = this.titleRequirements.find(
      (requirement) => xp >= requirement.xp
    );
    return matchingRequirement ? matchingRequirement.title : old_title;
  }
}


/******************************************************************/
/*                                                                */
/* This is a system where players can earn experience points (xp) */
/*   based on the prize they win and the match mode they play.    */
/*                                                                */
/******************************************************************/
/*
  [input: prize]


  [ prize    |      xp      ]
  |-------------------------|
  |  200     |      51      |
  |  1000    |      80      |
  |  2000    |      82      |
  |  5000    |      95      |
  |  10000   |      105     |
  |  20000   |      110     |
  |  50000   |      123     |
  |  100000  |      154     |
  |  200000  |      182     |
  |  400000  |      201     |
  [_________________________]


  *** Match Mode multiplier ***

  VS_COMPUTER     --->   0.8
  VS_FRIENDS      --->   1.0
  ONLINE_RANDOM   --->   1.2
  TOURNAMENT      --->   2.0


  xp_earned = xp * multiplier


  [output: xp_earned]

*/

/******************************************************************/
/*                                                                */
/* This is a system where players get a Title on every experience */
/*                        points reached                          */
/*                                                                */
/******************************************************************/
/*

  [input: xp]

  export enum UserTitle {
    APEX_VANGUARD_01       = "Apex Vanguard",
    VIRTUOSO_WARLORD_02    = "Virtuoso Warlord",
    Maestro_Dominator_03   = "Maestro Dominator",
    Legend_Conqueror_04    = "Legend Conqueror",
    Elite_Battlemaster_05  = "Elite Battlemaster",
    Master_Sentinel_06     = "Master Sentinel",
    Prodigy_Valor_07       = "Prodigy Valor",
    Ace_Gladiator_08       = "Ace Gladiator",
    Veteran_09             = "Veteran",
    Challenger_10          = "Challenger"
  }

  [    xp-required    |         new-title           ]
  |-------------------------------------------------|
  |  32000            |      Apex Vanguard          |
  |  26000            |      Virtuoso Warlord       |
  |  21000            |      Maestro Dominator      |
  |  16500            |      Legend Conqueror       |
  |  12500            |      Elite Battlemaster     |
  |  9000             |      Master Sentinel        |
  |  6000             |      Prodigy Valor          |
  |  3500             |      Ace Gladiator          |
  |  1500             |      Veteran                |
  |  default          |      Challenger             |
  [_________________________________________________]

  if xp reach the requirement the player gets the new-title
  else he keeps his old-title

  [output: new-title or old title]

*/