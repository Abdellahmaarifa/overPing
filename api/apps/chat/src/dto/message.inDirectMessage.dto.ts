
// ADD MESSAGE IN DM
export class AddMessageInDMdto {
  userId:      number
  recipientId: number
  groupChatId: number
  text:        string
  created_at?: Date | null
}

// UPDATE MESSAGE IN DM
export class UpdateMessageInDMdto {
  userId:      number
  recipientId: number
  groupChatId: number
  messageId:   number
  text:        string
}

// DELETE MESSAGE IN DM
export class DeleteMessageInDMdto {
  userId:      number
  groupChatId: number
  messageId:   number
}

// MESSAGES IN DM
export class DMMessagesdto {
  userId:      number
  groupChatId: number
  page:        number
}