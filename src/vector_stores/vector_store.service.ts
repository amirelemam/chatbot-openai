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

  async createFile(
    vectorStoreId: string,
    fileId: string,
  ): Promise<OpenAI.Beta.VectorStores.Files.VectorStoreFile> {
    const vectorStoreFile = await openai.beta.vectorStores.files.create(
      vectorStoreId,
      {
        file_id: fileId,
      },
    );

    return vectorStoreFile;
  }

  async createFileBatch(
    vectorStoreId: string,
    fileIds: string[],
  ): Promise<OpenAI.Beta.VectorStores.Files.VectorStoreFile[]> {
    const vectorStoreFiles = await Promise.all(
      fileIds.map((fileId) =>
        openai.beta.vectorStores.files.create(vectorStoreId, {
          file_id: fileId,
        }),
      ),
    );

    return vectorStoreFiles;
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

  async getFiles(
    vectorStoreId: string,
  ): Promise<OpenAI.Beta.VectorStores.Files.VectorStoreFilesPage> {
    const vectorStoreFiles =
      await openai.beta.vectorStores.files.list(vectorStoreId);

    return vectorStoreFiles;
  }

  async getFile(
    vectorStoreId: string,
    fileId: string,
  ): Promise<OpenAI.Beta.VectorStores.Files.VectorStoreFile> {
    const vectorStoreFile = await openai.beta.vectorStores.files.retrieve(
      vectorStoreId,
      fileId,
    );

    return vectorStoreFile;
  }

  async getFileBatch(
    vectorStoreId: string,
    batchId: string,
  ): Promise<OpenAI.Beta.VectorStores.FileBatches.VectorStoreFileBatch> {
    const vectorStoreFileBatch =
      await openai.beta.vectorStores.fileBatches.retrieve(
        vectorStoreId,
        batchId,
      );

    return vectorStoreFileBatch;
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

  async deleteFile(
    vectorStoreId: string,
    fileId: string,
  ): Promise<OpenAI.Beta.VectorStores.Files.VectorStoreFileDeleted> {
    const deletedVectorStoreFile = await openai.beta.vectorStores.files.del(
      vectorStoreId,
      fileId,
    );

    return deletedVectorStoreFile;
  }

  async cancelFileBatch(
    vectorStoreId: string,
    batchId: string,
  ): Promise<OpenAI.Beta.VectorStores.FileBatches.VectorStoreFileBatch> {
    const deletedVectorStoreFileBatch =
      await openai.beta.vectorStores.fileBatches.cancel(vectorStoreId, batchId);
    return deletedVectorStoreFileBatch;
  }

  async getFilesInBatch(
    vectorStoreId: string,
    batchId: string,
  ): Promise<OpenAI.Beta.VectorStores.Files.VectorStoreFilesPage> {
    const vectorStoreFiles =
      await openai.beta.vectorStores.fileBatches.listFiles(
        vectorStoreId,
        batchId,
      );

    return vectorStoreFiles;
  }
}
