import { IUser } from "@app/common";

export class IMembersWithInfo {
  owner:   IAdmins
  admins:  IAdmins[]
  members: IMembers[]
}

class IAdmins {
  id:             number;
  username?:      string;
  nickname?:      string;
  email?:         string;
  lastSeen?:      Date;
  profileImgUrl?: string;
}

class IMembers {
  id:             number;
  username?:      string;
  nickname?:      string;
  email?:         string;
  lastSeen?:      Date;
  profileImgUrl?: string;
}