export enum MatchMode {
    ONLINE_RANDOM = "online-random-match",
    VS_COMPUTER   = "match-against-computer",
    VS_FRIENDS    = "friends-match",
    TOURNAMENT    = "tournament-match"
  }

export class Achieve
{
    user_id: number = 0; 
    score_for: number = 0;
    score_against: number = 0;
    is_winner: boolean = false;
    bet: number = 0;
    matchMode: MatchMode = MatchMode.ONLINE_RANDOM;
    strict_shot_goals: number = 0;
    rebounded_goals: number = 0;
    starts_collected: number = 0;
}
