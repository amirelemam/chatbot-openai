import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import * as dotenv from 'dotenv';
import { UpdateDTO } from './assistant.type';

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

@Injectable()
export class AssistantService {
  async create(): Promise<OpenAI.Beta.Assistants.Assistant> {
    const assistant = await openai.beta.assistants.create({
      name: 'Support Chatbot',
      instructions:
        'You take care of the customer requests and recomemnds steps to solve the issue.',
      model: 'gpt-4o',
      tools: [{ type: 'file_search' }],
    });

    return assistant;
  }

  async getAll(): Promise<OpenAI.Beta.Assistants.AssistantsPage> {
    const assistants = await openai.beta.assistants.list();

    return assistants;
  }

  async getById(
    assistantId: string,
  ): Promise<OpenAI.Beta.Assistants.Assistant> {
    const assistant = await openai.beta.assistants.retrieve(assistantId);

    return assistant;
  }

  async delete(
    assistantId: string,
  ): Promise<OpenAI.Beta.Assistants.AssistantDeleted> {
    const assistant = await openai.beta.assistants.del(assistantId);

    return assistant;
  }

  async update(
    assistantId: string,
    body: UpdateDTO,
  ): Promise<OpenAI.Beta.Assistants.Assistant> {
    const {
      model = 'gpt-4o',
      name = null,
      description = '',
      instructions = '',
      tools = [],
      toolResources = null,
      temperature = null,
      topP = null,
    } = body;

    const assistant = await openai.beta.assistants.update(assistantId, {
      model,
      name,
      description,
      instructions,
      tools,
      tool_resources: toolResources,
      temperature,
      top_p: topP,
    });

    return assistant;
  }
}
