import { FriendshipStatusType } from "./friendshipStatus";

export class FriendshipDTO {
    id: number;
    userA: number;
    userB: number;
    blocker: number | null;
    status: FriendshipStatusType;
  }
  