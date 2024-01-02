// ADD MESSAGE IN DM
export class AddMessageInDMdto {
  userId:      number;
  recipientId: number;
  groupChatId: number;
  text:       string;
}

// UPDATE MESSAGE IN DM
export class UpdateMessageInDMdto {
  userId:      number;
  recipientId: number;
  groupChatId: number;
  messageId:   number;
  text:        string;
}

// DELETE MESSAGE IN DM
export class DeleteMessageInDMdto {
  userId:      number;
  groupChatId: number;
  messageId:   number;
}