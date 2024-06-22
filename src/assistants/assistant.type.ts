import OpenAI from 'openai';

type AssistantTools = OpenAI.Beta.Assistants.AssistantTool;

type ToolResources = OpenAI.Beta.Assistants.AssistantUpdateParams.ToolResources;

export type AssistantDTO = {
  id: string;
};

export type CreateDTO = {
  model: string;
  name?: string;
  description?: string;
  instructions?: string;
  tools?: AssistantTools[];
  toolResources?: ToolResources;
  temperature?: number;
  topP?: number;
};

export type UpdateDTO = {
  id: string;
  model?: string;
  name?: string;
  description?: string;
  instructions?: string;
  tools?: AssistantTools[];
  toolResources?: ToolResources;
  temperature?: number;
  topP?: number;
};
