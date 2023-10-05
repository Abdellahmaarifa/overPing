import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserProfile } from './user.entity';

@Entity()
export class MatchHistory {
  scoreUser1: number;
  scoreUser2: number;
  winner_id:  number;
  prize:      number;
  xp_earned:  number;
  date:       Date;
}