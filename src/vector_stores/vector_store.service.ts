import { Injectable, HttpException } from '@nestjs/common';
import { openai } from '../openai';
import OpenAI from 'openai';
import * as fs from 'fs';

@Injectable()
export class VectorStoreService {
  async create(
    fileIds: any[],
    name = 'Support FAQ',
  ): Promise<OpenAI.Beta.VectorStores.VectorStore> {
    try {
      return await openai.beta.vectorStores.create({
        name,
        file_ids: fileIds,
      });
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

  async uploadFileToVectorStore(
    vectorStoreId: string,
    file: Express.Multer.File,
  ): Promise<OpenAI.Beta.VectorStores.Files.VectorStoreFile> {
    try {
      const fileUploaded = await openai.files.create({
        file: fs.createReadStream(file.path),
        purpose: 'assistants',
      });

      fs.unlink(file.path, (err) => {
        if (err) {
          console.error(err);
        }
      });

      return await openai.beta.vectorStores.files.create(vectorStoreId, {
        file_id: fileUploaded.id,
      });
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
}
