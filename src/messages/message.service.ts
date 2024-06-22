import { Injectable, HttpException } from '@nestjs/common';
import OpenAI from 'openai';
import { openai } from '../openai';
@Injectable()
export class MessageService {
  async addMessageToThread(
    threadId: string,
    content: string,
  ): Promise<OpenAI.Beta.Threads.Messages.Message> {
    try {
      return await openai.beta.threads.messages.create(threadId, {
        role: 'user',
        content,
      });
    } catch (error: any) {
      throw new HttpException({ message: error.message }, error.status);
    }
  }

  async getAllByThread(threadId: string) {
    try {
      return await openai.beta.threads.messages.list(threadId);
    } catch (error: any) {
      throw new HttpException({ message: error.message }, error.status);
    }
  }

  async getById(messageId: string, threadId: string) {
    try {
      return await openai.beta.threads.messages.retrieve(threadId, messageId);
    } catch (error: any) {
      throw new HttpException({ message: error.message }, error.status);
    }
  }

  async update(messageId: string, threadId: string, metadata: any) {
    try {
      return await openai.beta.threads.messages.update(threadId, messageId, {
        metadata,
      });
    } catch (error: any) {
      throw new HttpException({ message: error.message }, error.status);
    }
  }

  async delete(messageId: string, threadId: string) {
    try {
      return await openai.beta.threads.messages.del(threadId, messageId);
    } catch (error: any) {
      throw new HttpException({ message: error.message }, error.status);
    }
  }
}
