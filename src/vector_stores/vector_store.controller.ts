import { VectorStoreService } from './vector_store.service';
import { Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import OpenAI from 'openai';

@Controller()
export class VectorStoreController {
  constructor(private readonly vectorStoreService: VectorStoreService) {}

  @Post('vector-stores')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(): Promise<OpenAI.Beta.VectorStores.VectorStore> {
    return this.vectorStoreService.createVectorStore();
  }

  @Get('vector-stores')
  listVectorStores(): Promise<OpenAI.Beta.VectorStores.VectorStoresPage> {
    return this.vectorStoreService.listVectorStores();
  }
}
