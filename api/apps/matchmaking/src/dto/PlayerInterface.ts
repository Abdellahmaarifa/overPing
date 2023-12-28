export interface Player {
    id: string;
    xp: number;
    rank: number;
    bet: number;
    matched: boolean;
    type: PoolType;
    timePlayerJoin: Date
  }
  
export enum PoolType {
    Classic = 'classic',
    Sandstorm = 'sandstorm',
    LastPong = 'lastPong',
}