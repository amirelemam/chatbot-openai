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
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import OpenAI from 'openai';
import {
  VectorStoreFileParams,
  VectorStoreParams,
  VectorStoreDTO,
} from './vector_store.type';
import multerConfig from './multer-config';

@Controller()
export class VectorStoreController {
  constructor(private readonly vectorStoreService: VectorStoreService) {}

  @Post('vector-stores')
  create(
    @Body() body: VectorStoreDTO,
  ): Promise<OpenAI.Beta.VectorStores.VectorStore> {
    return this.vectorStoreService.create(body.fileIds, body.name);
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

  @Post('vector-stores/:vectorStoreId/upload-files')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  uploadFileToVectorStore(
    @Param() params: VectorStoreParams,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<OpenAI.Beta.VectorStores.Files.VectorStoreFile> {
    return this.vectorStoreService.uploadFileToVectorStore(
      params.vectorStoreId,
      file,
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

  @Delete('vector-stores/:vectorStoreId/files/:fileId')
  deleteFile(
    @Param() params: VectorStoreParams & VectorStoreFileParams,
  ): Promise<OpenAI.Beta.VectorStores.Files.VectorStoreFileDeleted> {
    return this.vectorStoreService.deleteFile(
      params.vectorStoreId,
      params.fileId,
    );
  }
}
