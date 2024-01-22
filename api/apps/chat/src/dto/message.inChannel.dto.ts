// ADD MESSAGE IN CHANNEL
export class AddMessageInChanneldto {
  userId:     number
  channelId:  number
  text:       string
}

// UPDATE MESSAGE IN CHANNEL
export class UpdateMessageInChanneldto {
  userId:     number
  channelId:  number
  messageId:  number
  text:       string
}

// DELETE MESSAGE IN CHANNEL
export class DeleteMessageInChanneldto {
  userId:     number
  channelID:  number
  messageId:  number
}

// MESSAGES IN CHANNEL
export class ChannelMessagesdto {
  userId:    number
  channelId: number
  page:      number
}