import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

@Injectable()
export class VectorStoreService {
  async create(): Promise<OpenAI.Beta.VectorStores.VectorStore> {
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

  async get(): Promise<OpenAI.Beta.VectorStores.VectorStoresPage> {
    const vectorStores = await openai.beta.vectorStores.list();

    return vectorStores;
  }

  async getById(
    vectorStoreId: string,
  ): Promise<OpenAI.Beta.VectorStores.VectorStore> {
    const vectorStore = await openai.beta.vectorStores.retrieve(vectorStoreId);

    return vectorStore;
  }

  async update(vectorStoreId: string, name: string) {
    const vectorStore = await openai.beta.vectorStores.update(vectorStoreId, {
      name,
    });

    return vectorStore;
  }

  async delete(vectorStoreId: string) {
    const deletedVectorStore =
      await openai.beta.vectorStores.del(vectorStoreId);

    return deletedVectorStore;
  }
}
