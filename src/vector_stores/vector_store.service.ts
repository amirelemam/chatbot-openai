import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

@Injectable()
export class VectorStoreService {
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
}
