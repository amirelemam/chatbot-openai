import { VectorStoreService } from './vector_store.service';
import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  Patch,
  Param,
  Body,
  Delete,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import OpenAI from 'openai';
import {
  VectorStoreFileParams,
  VectorStoreParams,
  VectorStoreFileBatchParams,
  VectorStoreDTO,
} from './vector_store.type';

@Controller()
export class VectorStoreController {
  constructor(private readonly vectorStoreService: VectorStoreService) {}

  @Post('vector-stores')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(): Promise<OpenAI.Beta.VectorStores.VectorStore> {
    return this.vectorStoreService.create();
  }

  @Post('vector-stores/:vectorStoreId/files')
  createFile(
    @Body() body: VectorStoreDTO,
    @Param() params: VectorStoreParams,
  ): Promise<OpenAI.Beta.VectorStores.Files.VectorStoreFile> {
    return this.vectorStoreService.createFile(
      params.vectorStoreId,
      body.fileIds[0],
    );
  }

  @Post('vector-stores/:vectorStoreId/file_batches')
  createFileBatch(
    @Body() body: VectorStoreDTO,
    @Param() params: VectorStoreParams,
  ): Promise<OpenAI.Beta.VectorStores.Files.VectorStoreFile[]> {
    return this.vectorStoreService.createFileBatch(
      params.vectorStoreId,
      body.fileIds,
    );
  }

  @Get('vector-stores/:vectorStoreId/files')
  getFiles(
    @Param() params: VectorStoreParams,
  ): Promise<OpenAI.Beta.VectorStores.Files.VectorStoreFilesPage> {
    return this.vectorStoreService.getFiles(params.vectorStoreId);
  }

  @Get('vector-stores/:vectorStoreId/files/:fileId')
  getFile(
    @Param() params: VectorStoreParams & VectorStoreFileParams,
  ): Promise<OpenAI.Beta.VectorStores.Files.VectorStoreFile> {
    return this.vectorStoreService.getFile(params.vectorStoreId, params.fileId);
  }

  @Get('vector-stores/:vectorStoreId/file_batches/:fileBatchId/files')
  getFileBatch(
    @Param() params: VectorStoreParams & VectorStoreFileBatchParams,
  ): Promise<OpenAI.Beta.VectorStores.FileBatches.VectorStoreFileBatch> {
    return this.vectorStoreService.getFileBatch(
      params.vectorStoreId,
      params.batchId,
    );
  }

  @Get('vector-stores/:vectorStoreId/file_batches/:fileBatchId/files')
  getFilesInBatch(
    @Param() params: VectorStoreParams & VectorStoreFileBatchParams,
  ): Promise<OpenAI.Beta.VectorStores.Files.VectorStoreFilesPage> {
    return this.vectorStoreService.getFilesInBatch(
      params.vectorStoreId,
      params.batchId,
    );
  }

  @Get('vector-stores')
  get(): Promise<OpenAI.Beta.VectorStores.VectorStoresPage> {
    return this.vectorStoreService.get();
  }

  @Get('vector-stores/:vectorStoreId')
  getById(
    @Param() params: VectorStoreParams,
  ): Promise<OpenAI.Beta.VectorStores.VectorStore> {
    return this.vectorStoreService.getById(params.vectorStoreId);
  }

  @Patch('vector-stores/:vectorStoreId')
  update(
    @Body() body: VectorStoreDTO,
    @Param() params: VectorStoreParams,
  ): Promise<OpenAI.Beta.VectorStores.VectorStore> {
    return this.vectorStoreService.update(params.vectorStoreId, body.name);
  }

  @Delete('vector-stores/:vectorStoreId')
  delete(
    @Param() params: VectorStoreParams,
  ): Promise<OpenAI.Beta.VectorStores.VectorStoreDeleted> {
    return this.vectorStoreService.delete(params.vectorStoreId);
  }

  @Delete('vector-stores/:vectorStoreId/files/:fileId')
  deleteFile(
    @Param() params: VectorStoreParams & VectorStoreFileParams,
  ): Promise<OpenAI.Beta.VectorStores.Files.VectorStoreFileDeleted> {
    return this.vectorStoreService.deleteFile(
      params.vectorStoreId,
      params.fileId,
    );
  }

  @Delete('vector-stores/:vectorStoreId/file_batches/:fileBatchId/cancel')
  deleteFileBatch(
    @Param() params: VectorStoreParams & VectorStoreFileBatchParams,
  ): Promise<OpenAI.Beta.VectorStores.FileBatches.VectorStoreFileBatch> {
    return this.vectorStoreService.cancelFileBatch(
      params.vectorStoreId,
      params.batchId,
    );
  }
}
