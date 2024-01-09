import { IMessage } from "./message.interface"

export class IDirectMessage {
  id:           number
  user1_id:     number
  user2_id:     number
  messages?:    IMessage[]
  created_at:   any
}