import { IAdmins, IMembers } from "./channel.interface"

export class IMembersWithInfo {
  owner:   IAdmins
  admins:  IAdmins[]
  members: IMembers[]
}
