import { Injectable, HttpException } from '@nestjs/common';
import OpenAI from 'openai';
import { openai } from '../openai';
import { CreateDTO, UpdateDTO } from './assistant.type';

@Injectable()
export class AssistantService {
  async create(body: CreateDTO): Promise<OpenAI.Beta.Assistants.Assistant> {
    try {
      const {
        model,
        name = null,
        description = '',
        instructions = '',
        tools = [],
        toolResources = null,
        temperature = null,
        topP = null,
      } = body;

      return await openai.beta.assistants.create({
        model,
        name,
        description,
        instructions,
        tools,
        tool_resources: toolResources,
        temperature,
        top_p: topP,
      });
    } catch (error: any) {
      throw new HttpException({ message: error.message }, error.status);
    }
  }

  async getAll(): Promise<OpenAI.Beta.Assistants.AssistantsPage> {
    try {
      return await openai.beta.assistants.list();
    } catch (error: any) {
      throw new HttpException({ message: error.message }, error.status);
    }
  }

  async getById(
    assistantId: string,
  ): Promise<OpenAI.Beta.Assistants.Assistant> {
    try {
      return await openai.beta.assistants.retrieve(assistantId);
    } catch (error: any) {
      throw new HttpException({ message: error.message }, error.status);
    }
  }

  async delete(
    assistantId: string,
  ): Promise<OpenAI.Beta.Assistants.AssistantDeleted> {
    try {
      return await openai.beta.assistants.del(assistantId);
    } catch (error: any) {
      throw new HttpException({ message: error.message }, error.status);
    }
  }

  async update(
    assistantId: string,
    body: UpdateDTO,
  ): Promise<OpenAI.Beta.Assistants.Assistant> {
    try {
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

      return await openai.beta.assistants.update(assistantId, {
        model,
        name,
        description,
        instructions,
        tools,
        tool_resources: toolResources,
        temperature,
        top_p: topP,
      });
    } catch (error: any) {
      throw new HttpException({ message: error.message }, error.status);
    }
  }
}
