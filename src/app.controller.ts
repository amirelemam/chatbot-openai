import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import OpenAI from 'openai';

type MessageDTO = {
  threadId: string;
  content: string;
  assistantId: string;
};

type ThreadDTO = {
  id: string;
};

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  ///// Threads
  @Post('threads')
  createThread(): Promise<OpenAI.Beta.Threads.Thread> {
    return this.appService.createThread();
  }

  @Patch('threads')
  updateThread(
    @Query() thread: ThreadDTO,
  ): Promise<OpenAI.Beta.Threads.Thread> {
    return this.appService.updateThread(thread.id);
  }

  //// Messages
  @Post('messages')
  addMessageToThread(
    @Body() body: MessageDTO,
  ): Promise<OpenAI.Beta.Threads.Runs.Run> {
    const { threadId, content, assistantId } = body;
    return this.appService.addMessageToThread(threadId, content, assistantId);
  }

  //// Runs

  //// Run Steps

  //// Vector Stores

  @Post('vector-stores')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(): Promise<OpenAI.Beta.VectorStores.VectorStore> {
    return this.appService.createVectorStore();
  }

  @Get('vector-stores')
  listVectorStores(): Promise<OpenAI.Beta.VectorStores.VectorStoresPage> {
    return this.appService.listVectorStores();
  }

  //// Vector Store Files

  ///// Vector Store Files Batches

  ///// Streaming
}
