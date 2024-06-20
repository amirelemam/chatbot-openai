import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import * as dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

@Injectable()
export class MessageService {
  async addMessageToThread(
    threadId: string,
    content: string,
    assistantId: string,
  ): Promise<OpenAI.Beta.Threads.Runs.Run> {
    const message = await openai.beta.threads.messages.create(threadId, {
      role: 'user',
      content,
    });
    console.log({ message });

    const run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: assistantId,
    });

    return run;
  }

  async getAllByThread(threadId: string) {
    const threadMessages = await openai.beta.threads.messages.list(threadId);

    return threadMessages;
  }

  async getById(messageId: string, threadId: string) {
    const message = await openai.beta.threads.messages.retrieve(
      threadId,
      messageId,
    );

    return message;
  }

  async update(messageId: string, threadId: string, metadata: any) {
    const message = await openai.beta.threads.messages.update(
      threadId,
      messageId,
      {
        metadata,
      },
    );

    return message;
  }

  async delete(messageId: string, threadId: string) {
    const deletedMessage = await openai.beta.threads.messages.del(
      threadId,
      messageId,
    );

    return deletedMessage;
  }
}
