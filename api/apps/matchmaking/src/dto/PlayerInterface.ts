export interface Player {
    id: number;
    xp: number;
    rank: number;
    bet: number;
    matched: boolean;
    type: PoolType;
    timePlayerJoin: Date
  }

export interface PlayerRequestDto {
    id: number;
    recipientId: number;
    matched: boolean;
    type: PoolType;
    timePlayerJoin: Date
}

export interface acceptMatchToPlayDto {
    senderId: number;
    recipientId: number;
    matchType: string;
}
export enum PoolType {
    Classic = 'classic',
    Sandstorm = 'sandstorm',
    LastPong = 'lastPong',
}

