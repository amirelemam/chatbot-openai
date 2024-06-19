import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import * as dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

@Injectable()
export class AssistantService {
  async createAssistant(): Promise<OpenAI.Beta.Assistants.Assistant> {
    const assistant = await openai.beta.assistants.create({
      name: 'Support Chatbot',
      instructions:
        'You take care of the customer requests and recomemnds steps to solve the issue.',
      model: 'gpt-4o',
      tools: [{ type: 'file_search' }],
    });

    return assistant;
  }

  async listAssistants(): Promise<OpenAI.Beta.Assistants.AssistantsPage> {
    const assistants = await openai.beta.assistants.list();

    return assistants;
  }

  async listAssistantById(
    assistantId: string,
  ): Promise<OpenAI.Beta.Assistants.Assistant> {
    const assistant = await openai.beta.assistants.retrieve(assistantId);

    return assistant;
  }

  async deleteAssistant(
    assistantId: string,
  ): Promise<OpenAI.Beta.Assistants.AssistantDeleted> {
    const assistant = await openai.beta.assistants.del(assistantId);

    return assistant;
  }

  async updateAssistant(assistantId: string) {
    const assistant = await openai.beta.assistants.update(assistantId, {
      model: 'gpt-4-turbo',
    });

    return assistant;
  }
}
