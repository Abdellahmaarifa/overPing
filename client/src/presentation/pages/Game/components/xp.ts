export enum MatchMode 
{
    ONLINE_RANDOM = "online-random-match",
    VS_COMPUTER   = "match-against-computer",
    VS_FRIENDS    = "friends-match",
    TOURNAMENT    = "tournament-match"
}

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