import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

@Injectable()
export class AppService {
  async createVectorStore(): Promise<OpenAI.Beta.VectorStores.VectorStore> {
    // const embedding = await openai.embeddings.create({
    const file = await openai.files.create({
      file: fs.createReadStream('./src/faq.json'),
      purpose: 'assistants',
    });

    const vectorStore = await openai.beta.vectorStores.create({
      name: 'Support FAQ',
      file_ids: [file.id],
    });

    return vectorStore;
  }

  async listVectorStores(): Promise<OpenAI.Beta.VectorStores.VectorStoresPage> {
    const vectorStores = await openai.beta.vectorStores.list();

    return vectorStores;
  }

  async createThread(): Promise<OpenAI.Beta.Threads.Thread> {
    const emptyThread = await openai.beta.threads.create();

    console.log(emptyThread);

    return emptyThread;
  }

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

  async updateThread(threadId: string): Promise<OpenAI.Beta.Threads.Thread> {
    const thread = await openai.beta.threads.retrieve(threadId);

    return thread;
  }
}
