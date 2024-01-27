import { IUser } from "../auth/interface/auth.user.interface"
import { IMessage } from "./message.interface"

export class IDirectMessage {
  id:           number
  user1:        IUser
  user2:        IUser
  messages?:    IMessage[]
  created_at:   any
}