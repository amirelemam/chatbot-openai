export type MessageDTO = {
  id?: string;
  threadId: string;
  content?: string;
};

export type NewMessageDTO = {
  threadId: string;
  messageId: string;
  metadata: {
    modified: string;
    user: string;
  };
};
