import { Entity } from 'typeorm';

@Entity()
export class Achievement {
  id:     number;
  title:  string;
}