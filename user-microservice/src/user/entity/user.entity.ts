import { GameStat } from './games_stat.entity';
import { Achievement } from './achievement.entity';
import { MatchHistory } from './match-history.entity';


// Profile Entity:
export class UserProfile {
  id:       number;
  user_id:  number;
  username: string;
  nickname: String;
  xp:       number;
  rank:     number;
  wallet:   number;
  about:    string;

  games_stat:     GameStat[];
  achievements:   Achievement[];
  matchesAsUser1: MatchHistory[];
  matchesAsUser2: MatchHistory[];

  created_at: Date;
  updated_at: Date
}

// UseProfile Input:
export class UserProfileInput {
  username?:  string;
  nickname?:  String;
  xp?:        number;
  rank?:      number;
  wallet?:    number;
  about?:     string
}