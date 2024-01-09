import { IMessage } from "./message.interface"

export class IChannel {
  id:            number
  owner_id:      number
  name:          string
  description:   string
  visibility:    string
  admins:        IAdmins[]
  members:       IMembers[]
  messages?:     IMessage[]
  created_at:    any
  updated_at:    any
}

export class IAdmins {
  userId:  number
}

export class IMembers {
  userId:  number
}


export class IChannelSearch {
  id:         number
  name:       string
  visibility: string
}

export enum IVisibility {
  PUBLIC = 'public',
  PRIVATE = 'private',
  PROTECTED = 'protected',
}