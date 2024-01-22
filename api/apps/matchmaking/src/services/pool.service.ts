
import { Injectable, Inject } from '@nestjs/common';
import { PoolType, Player, PlayerRequestDto } from '../dto/PlayerInterface';
import { RespondToPlayDto } from '../dto/join-matchmaking.dto';

@Injectable()
export class PoolService {
  private playersByPool: Record<PoolType, Player[]> = {
    [PoolType.Classic]: [],
    [PoolType.Sandstorm]: [],
    [PoolType.LastPong]: [],
  };
  private playerRequesPool: Record<PoolType, PlayerRequestDto[]> ={
    [PoolType.Classic]: [],
    [PoolType.Sandstorm]: [],
    [PoolType.LastPong]: [],
  }
  constructor() { }

  addPlayer(player: Player): void {
    if (this.isPlayerInPool(player)) {
      console.log(`Player ${player.id} is already in the pool: ${player.type}`);
      return;
    }
    player.matched = false;
    this.playersByPool[player.type].push(player);
    console.log("player add to the Pool : ", player.type, " ", player.id);
  }

  private isPlayerInPool(player: Player | PlayerRequestDto): boolean {
    console.log("player type in pool service ", player);
    const players = this.playersByPool[player.type];
    return players.some(existingPlayer => existingPlayer.id === player.id);
  }

  removePlayer(playerId: number, type: PoolType): void {
    const players = this.playersByPool[type];
    const index = players.findIndex((player) => player.id === playerId);
    if (index !== -1) {
      players.splice(index, 1);
      console.log(`Player ${playerId} removed from pool: ${type}`);
    } else {
      console.error(`Player with ID ${playerId} not found in pool: ${type}`);
    }
  }


  matchPlayers(type: PoolType): [Player, Player] | null {
    // console.log("******************************************************")
    // console.log(`Matching players for pool: ${type}`);
    const players = this.playersByPool[type];

    if (players.length < 1) {
      // console.log(`Insufficient players in pool: ${type}`);
      return null;
    }

    console.log(`Total players in pool ${type}: ${players.length}`);
    const weightedSkills = players.map(player => ({
      player,
      weightedSkill: this.calculateWeightedAverage(player.rank, player.xp)
    }));

    // console.log(`Calculating weighted skills:`);
    // console.log(weightedSkills);

    weightedSkills.sort((a, b) => a.weightedSkill - b.weightedSkill);

    // console.log(`sorting Pool with weightedSkills:`);
    // console.log(weightedSkills);

    // Calculate dynamic gapThreshold based on average skill
    const averageSkill = weightedSkills.reduce((sum, player) => sum + player.weightedSkill, 0) / weightedSkills.length;
    const gapThreshold = this.calculateDynamicThreshold(averageSkill);
    const playerTimeOut = 10 * 1000; // 1 minute in milliseconds

    // console.log(`===================================\nPlayers in pool ${type}:`, weightedSkills.map(entry => entry.player));

    for (let i = 0; i < weightedSkills.length; i++) {
      const current = weightedSkills[i];
      let minDiff = Infinity;
      let bestMatch = undefined;
      for (let j = i + 1; j < weightedSkills.length; j++) {
        const next = weightedSkills[j];

        if (current.player.bet === next.player.bet) {
          const currentDiff = Math.abs(current.weightedSkill - next.weightedSkill);
          if (currentDiff < minDiff) {
            minDiff = currentDiff;
            bestMatch = next;
          }
        }
      }
      if (bestMatch != undefined && minDiff <= gapThreshold) {
        console.log(`Match found based on skill proximity: ${current.player.id} vs ${bestMatch.player.id}`);
        this.removePlayer(current.player.id , current.player.type);
        this.removePlayer(bestMatch.player.id, bestMatch.player.type );
        return [current.player, bestMatch.player];
      }
      const currentTime = new Date().getTime();
      const playerTime = current.player.timePlayerJoin.getTime();
      if (bestMatch != undefined && currentTime - playerTime >= playerTimeOut) {
        console.log(`Match found due to player timeout: ${current.player.id} vs ${bestMatch.player.id} type ${bestMatch.player.type}`);
        this.removePlayer(bestMatch.player.id, bestMatch.player.type );
        this.removePlayer(current.player.id , current.player.type);
        return [current.player, bestMatch.player];
      }
      if (bestMatch == undefined && currentTime - playerTime >= playerTimeOut){
        this.removePlayer(current.player.id , current.player.type);
        return [current.player, null];
      }
    }

    console.log('No suitable match found.');
    
    return null;
  }

  private calculateDynamicThreshold(averageSkill: number): number {
    // multiplier can adjust  based on  game's requirements
    const multiplier = 0.5;
    return averageSkill * multiplier;
  }

  private calculateWeightedAverage(rank: number, xp: number): number {
    const rankWeight = 0.7; // Adjust as needed
    const xpWeight = 0.3;   // Adjust as needed

    return (rank * rankWeight) + (xp * xpWeight);
  }
// frined request========================
  addRequestToQueue(player: PlayerRequestDto){
    if (this.isPlayerInPool(player)) {
      console.log(`Player ${player.id} is already in the pool: ${player.type}`);
      return null;
    }
    player.matched = false;
    console.log("player add to the Pool : ", player);
    this.playerRequesPool[player.type].push(player);
    console.log("player add to the Pool : ", player.type, " ", player.id);
    const request: RespondToPlayDto = {
      userId: player.id,
      recipientId: player.recipientId,
      matchType: player.type,
    };
    return request;
  }

  removePlayerRequest(playerId: number, type: PoolType): void {
    const players = this.playerRequesPool[type];
    const index = players.findIndex((player) => player.id === playerId);
    if (index !== -1) {
      players.splice(index, 1);
      console.log(`Player ${playerId} removed from pool: ${type}`);
    } else {
      console.error(`Player with ID ${playerId} not found in pool: ${type}`);
    }
  }

  async getPlayerRequest(playerId: number,recipientId:number, type: PoolType): Promise<PlayerRequestDto>{
    console.log("this is player id in get player request ", type, " ", playerId);
    const index = this.playerRequesPool[type].findIndex((player) => player.id === playerId && player.recipientId === recipientId);
    const players = this.playerRequesPool[type];
    if (index !== -1) {
      return players[index];
    } else {
      console.error(`Player with ID ${playerId} not found in pool: ${type}`);
      return null;
    }
  }
}