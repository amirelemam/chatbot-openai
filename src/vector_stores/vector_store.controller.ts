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
}
