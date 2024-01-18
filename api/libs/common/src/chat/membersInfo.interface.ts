import { IUser } from "@app/common";

export class IMembersWithInfo {
  owner:   IMembers
  admins:  IAdmins[]
  members: IMembers[]
}

class IAdmins {
  id:             number;
  username?:      string;
  email?:         string;
  lastSeen?:      Date;
  profileImgUrl?: string;
}

class IMembers {
  id:             number;
  username?:      string;
  email?:         string;
  lastSeen?:      Date;
  profileImgUrl?: string;
}