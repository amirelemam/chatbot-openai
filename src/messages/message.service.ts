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
}
