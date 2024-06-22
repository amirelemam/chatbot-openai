import { Injectable, HttpException } from '@nestjs/common';
import { openai } from '../openai';
import OpenAI from 'openai';
import * as fs from 'fs';

@Injectable()
export class VectorStoreService {
  async create(): Promise<OpenAI.Beta.VectorStores.VectorStore> {
    try {
      const file = await openai.files.create({
        file: fs.createReadStream('./src/faq.json'),
        purpose: 'assistants',
      });

      return await openai.beta.vectorStores.create({
        name: 'Support FAQ',
        file_ids: [file.id],
      });
    } catch (error: any) {
      throw new HttpException({ message: error.message }, error.status);
    }
  }

  async createFile(
    vectorStoreId: string,
    fileId: string,
  ): Promise<OpenAI.Beta.VectorStores.Files.VectorStoreFile> {
    try {
      return await openai.beta.vectorStores.files.create(vectorStoreId, {
        file_id: fileId,
      });
    } catch (error: any) {
      throw new HttpException({ message: error.message }, error.status);
    }
  }

  async createFileBatch(
    vectorStoreId: string,
    fileIds: string[],
  ): Promise<OpenAI.Beta.VectorStores.Files.VectorStoreFile[]> {
    try {
      return await Promise.all(
        fileIds.map((fileId) =>
          openai.beta.vectorStores.files.create(vectorStoreId, {
            file_id: fileId,
          }),
        ),
      );
    } catch (error: any) {
      throw new HttpException({ message: error.message }, error.status);
    }
  }

  async get(): Promise<OpenAI.Beta.VectorStores.VectorStoresPage> {
    try {
      return await openai.beta.vectorStores.list();
    } catch (error: any) {
      throw new HttpException({ message: error.message }, error.status);
    }
  }

  async getById(
    vectorStoreId: string,
  ): Promise<OpenAI.Beta.VectorStores.VectorStore> {
    try {
      return await openai.beta.vectorStores.retrieve(vectorStoreId);
    } catch (error: any) {
      throw new HttpException({ message: error.message }, error.status);
    }
  }

  async getFiles(
    vectorStoreId: string,
  ): Promise<OpenAI.Beta.VectorStores.Files.VectorStoreFilesPage> {
    try {
      return await openai.beta.vectorStores.files.list(vectorStoreId);
    } catch (error: any) {
      throw new HttpException({ message: error.message }, error.status);
    }
  }

  async getFile(
    vectorStoreId: string,
    fileId: string,
  ): Promise<OpenAI.Beta.VectorStores.Files.VectorStoreFile> {
    try {
      return await openai.beta.vectorStores.files.retrieve(
        vectorStoreId,
        fileId,
      );
    } catch (error: any) {
      throw new HttpException({ message: error.message }, error.status);
    }
  }

  async getFileBatch(
    vectorStoreId: string,
    batchId: string,
  ): Promise<OpenAI.Beta.VectorStores.FileBatches.VectorStoreFileBatch> {
    try {
      return await openai.beta.vectorStores.fileBatches.retrieve(
        vectorStoreId,
        batchId,
      );
    } catch (error: any) {
      throw new HttpException({ message: error.message }, error.status);
    }
  }

  async update(vectorStoreId: string, name: string) {
    try {
      return await openai.beta.vectorStores.update(vectorStoreId, {
        name,
      });
    } catch (error: any) {
      throw new HttpException({ message: error.message }, error.status);
    }
  }

  async delete(vectorStoreId: string) {
    try {
      return await openai.beta.vectorStores.del(vectorStoreId);
    } catch (error: any) {
      throw new HttpException({ message: error.message }, error.status);
    }
  }

  async deleteFile(
    vectorStoreId: string,
    fileId: string,
  ): Promise<OpenAI.Beta.VectorStores.Files.VectorStoreFileDeleted> {
    try {
      return await openai.beta.vectorStores.files.del(vectorStoreId, fileId);
    } catch (error: any) {
      throw new HttpException({ message: error.message }, error.status);
    }
  }

  async cancelFileBatch(
    vectorStoreId: string,
    batchId: string,
  ): Promise<OpenAI.Beta.VectorStores.FileBatches.VectorStoreFileBatch> {
    try {
      return await openai.beta.vectorStores.fileBatches.cancel(
        vectorStoreId,
        batchId,
      );
    } catch (error: any) {
      throw new HttpException({ message: error.message }, error.status);
    }
  }

  async getFilesInBatch(
    vectorStoreId: string,
    batchId: string,
  ): Promise<OpenAI.Beta.VectorStores.Files.VectorStoreFilesPage> {
    try {
      return await openai.beta.vectorStores.fileBatches.listFiles(
        vectorStoreId,
        batchId,
      );
    } catch (error: any) {
      throw new HttpException({ message: error.message }, error.status);
    }
  }
}
