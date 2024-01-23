import { IMessage } from "./message.interface"

export class IChannel {
  id:                number
  owner_id:          number
  name:              string
  description?:      string
  visibility:        string
  admins?:           IAdmins[]
  members?:          IMembers[]
  messages?:         IMessage[]
  latestMessage_at?: any
  created_at?:       any
  updated_at?:       any
}

export class IAdmins {
  id:             number;
  username?:      string;
  nickname?:      string;
  email?:         string;
  lastSeen?:      any;
  profileImgUrl?: string;
  muteStatus?:    boolean
}

export class IMembers {
  id:             number;
  username?:      string;
  nickname?:      string;
  email?:         string;
  lastSeen?:      any;
  profileImgUrl?: string;
  muteStatus?:    boolean
}


export class IChannelSearch {
  id:         number
  name:       string
  visibility: string
  joined:     boolean = false
}

export enum IVisibility {
  PUBLIC =    'public',
  PRIVATE =   'private',
  PROTECTED = 'protected',
}

export class IChannelInfo {
  name?:          string
  owner_id?:      number
  description?:   string
  visibility?:    string
}

export class IUpdatedChannel {
  id:               number
  owner_id:         number
  name:             string
  visibility:       string
  latestMessage_at: Date
}