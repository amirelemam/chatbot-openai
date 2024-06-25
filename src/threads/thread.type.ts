import OpenAI from 'openai';

type Role = 'user' | 'assistant';
type ToolResources = OpenAI.Beta.Assistants.AssistantUpdateParams.ToolResources;

export type CreateThreadDTO = {
  messages?: MessageDTO[];
  toolResources?: ToolResources;
};

export type UpdateThreadDTO = {
  toolResources?: ToolResources;
};

export type MessageDTO = {
  role: Role;
  content: string;
};

export type ThreadWithMessagesDTO = {
  assistantId: string;
  messages: MessageDTO[];
};

export type QueryStringDTO = {
  limit?: number;
  order?: string;
  after?: string;
  before?: string;
};

export type RunDTO = {
  id?: string;
  threadId?: string;
  assistantId: string;
  model?: string;
  instructions?: string | null;
  additionalInstructions?: string | null;
  additionalMessages?: string[] | null;
  tools?: string[] | null;
  metadata?: {
    modified: string;
    user: string;
  };
  temperature?: number | null;
  top_p?: number | null;
  stream?: boolean | null;
  maxPromptTokens?: number | null;
  maxCompletionTokens?: number | null;
  truncationStrategy?: object;
  toolChoice?: string | object;
  parallelToolCalls?: boolean | null;
  response_format?: string | object;
};

export type ThreadParams = {
  threadId: string;
};

export type RunParams = {
  runId: string;
};

export type StepParams = {
  stepId: string;
};
