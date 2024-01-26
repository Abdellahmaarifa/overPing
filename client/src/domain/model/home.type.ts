import { AnyObject } from "yup";

export interface MatchResaultType {
  id: number;
  userImage: string;
  opponentIamge: string;
  userScore: number;
  opponentScore: number;
  matchDate: Date;
  points: number;
  level: number;
  key?: any;
  isWin: boolean;
}
