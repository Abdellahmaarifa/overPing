import { IMessage } from "./message.interface"

export class IChannel {
  id:            number
  owner_id:      number
  name:          string
  description:   string
  visibility:    string
  admins:        IAdmins[]
  members:       IMembers[]
  messages:      IMessage[]
  createdAt:     Date
}

export class IAdmins {
  userId:  number
}

export class IMembers {
  userId:  number
}
