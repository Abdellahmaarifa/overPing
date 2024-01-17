
// CREATE CHANNEL DTO
export class CreateChanneldto {
  userId:       number
  channelName:  string
  description?: string
  visibility:   string
  password?:    string
}

// UPDATE CHANNEL DTO
export class UpdateChanneldto {
  userId:       number
  channelId:    number
  channelName?: string
  description?: string
  visibility:   string
  password?:    string
  oldPassword?: string
  newPassword?: string
}
