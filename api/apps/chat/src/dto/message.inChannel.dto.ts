// ADD MESSAGE IN CHANNEL
export class AddMessageInChanneldto {
  userId: number;
  channelId: number;
  text?: string;
  mediaId?: number;
}

// UPDATE MESSAGE IN CHANNEL
export class UpdateMessageInChanneldto {
  userId: number;
  channelId: number;
  messageId: number;
  text: string;
}

// DELETE MESSAGE IN CHANNEL
export class DeleteMessageInChanneldto {
  userId: number;
  channelID: number;
  messageId: number;
}
