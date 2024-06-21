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
    @Body() body: any,
    @Param() params: any,
  ): Promise<OpenAI.Beta.VectorStores.Files.VectorStoreFile> {
    return this.vectorStoreService.createFile(
      params.vectorStoreId,
      body.fileId,
    );
  }

  @Get('vector-stores/:vectorStoreId/files')
  getFiles(
    @Param() params: any,
  ): Promise<OpenAI.Beta.VectorStores.Files.VectorStoreFilesPage> {
    return this.vectorStoreService.getFiles(params.vectorStoreId);
  }

  @Get('vector-stores/:vectorStoreId/files/:fileId')
  getFile(
    @Param() params: any,
  ): Promise<OpenAI.Beta.VectorStores.Files.VectorStoreFile> {
    return this.vectorStoreService.getFile(params.vectorStoreId, params.fileId);
  }

  @Get('vector-stores')
  get(): Promise<OpenAI.Beta.VectorStores.VectorStoresPage> {
    return this.vectorStoreService.get();
  }

  @Get('vector-stores/:vectorStoreId')
  getById(@Param() params: any): Promise<OpenAI.Beta.VectorStores.VectorStore> {
    return this.vectorStoreService.getById(params.vectorStoreId);
  }

  @Patch('vector-stores/:vectorStoreId')
  update(
    @Body() body: any,
    @Param() params: any,
  ): Promise<OpenAI.Beta.VectorStores.VectorStore> {
    return this.vectorStoreService.update(params.vectorStoreId, body.name);
  }

  @Delete('vector-stores/:vectorStoreId')
  delete(
    @Param() params: any,
  ): Promise<OpenAI.Beta.VectorStores.VectorStoreDeleted> {
    return this.vectorStoreService.delete(params.vectorStoreId);
  }

  @Delete('vector-stores/:vectorStoreId/files/:fileId')
  deleteFile(
    @Param() params: any,
  ): Promise<OpenAI.Beta.VectorStores.Files.VectorStoreFileDeleted> {
    return this.vectorStoreService.deleteFile(
      params.vectorStoreId,
      params.fileId,
    );
  }
}
