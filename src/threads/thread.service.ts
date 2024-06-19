import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import * as dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

@Injectable()
export class ThreadService {
  async createThread(): Promise<OpenAI.Beta.Threads.Thread> {
    const emptyThread = await openai.beta.threads.create();

    console.log(emptyThread);

    return emptyThread;
  }

  async updateThread(threadId: string): Promise<OpenAI.Beta.Threads.Thread> {
    const thread = await openai.beta.threads.retrieve(threadId);

    return thread;
  }
}
