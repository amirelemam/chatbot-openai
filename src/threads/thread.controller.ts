import { Controller, Patch, Post, Query } from '@nestjs/common';
import { ThreadService } from './thread.service';
import OpenAI from 'openai';
import { ThreadDTO } from './thread.type';

@Controller()
export class ThreadController {
  constructor(private readonly threadService: ThreadService) {}

  @Post('threads')
  createThread(): Promise<OpenAI.Beta.Threads.Thread> {
    return this.threadService.createThread();
  }

  @Patch('threads')
  updateThread(
    @Query() thread: ThreadDTO,
  ): Promise<OpenAI.Beta.Threads.Thread> {
    return this.threadService.updateThread(thread.id);
  }
}
