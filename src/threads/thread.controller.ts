import {
  Controller,
  Get,
  Post,
  Delete,
  Query,
  Body,
  Param,
} from '@nestjs/common';
import { ThreadService } from './thread.service';
import OpenAI from 'openai';
import { ThreadDTO, ThreadWithMessagesDTO, RunDTO } from './thread.type';

@Controller()
export class ThreadController {
  constructor(private readonly threadService: ThreadService) {}

  @Post('threads')
  create(): Promise<OpenAI.Beta.Threads.Thread> {
    return this.threadService.create();
  }

  @Post('runs')
  createRun(@Body() body: RunDTO): Promise<OpenAI.Beta.Threads.Runs.Run> {
    const { threadId, assistantId } = body;
    return this.threadService.createRun(threadId, assistantId);
  }

  @Post('threads/runs')
  createAndRun(
    @Body() threadWithMessages: ThreadWithMessagesDTO,
  ): Promise<OpenAI.Beta.Threads.Runs.Run> {
    const { assistantId, messages } = threadWithMessages;
    return this.threadService.createAndRun(assistantId, messages);
  }

  @Get('threads')
  get(@Query() thread: ThreadDTO): Promise<OpenAI.Beta.Threads.Thread> {
    if (thread.id) {
      return this.threadService.getById(thread.id);
    }
  }

  @Get('threads/:threadId/runs/:runId')
  getRun(@Param() params: any): Promise<OpenAI.Beta.Threads.Runs.Run> {
    return this.threadService.getRun(params.threadId, params.runId);
  }

  @Get('threads/:threadId/runs')
  getRuns(@Param() params: any): Promise<OpenAI.Beta.Threads.Runs.RunsPage> {
    return this.threadService.getRuns(params.threadId);
  }

  @Get('threads/{thread_id}/runs/{run_id}/steps')
  getRunSteps(
    @Param() params: any,
  ): Promise<OpenAI.Beta.Threads.Runs.RunStepsPage> {
    return this.threadService.getRunSteps(params.threadId, params.runId);
  }

  @Get('threads/{thread_id}/runs/{run_id}/steps/:stepId')
  getRunStep(@Param() params: any): Promise<OpenAI.Beta.Threads.Runs.RunStep> {
    return this.threadService.getRunStep(
      params.threadId,
      params.runId,
      params.stepId,
    );
  }

  @Post('threads')
  update(@Query() thread: ThreadDTO): Promise<OpenAI.Beta.Threads.Thread> {
    return this.threadService.update(thread.id);
  }

  @Post('threads/:threadId/runs/:runId')
  updateRun(
    @Param() params: any,
    @Body() body: RunDTO,
  ): Promise<OpenAI.Beta.Threads.Runs.Run> {
    return this.threadService.updateRun(
      params.threadId,
      params.runId,
      body.metadata,
    );
  }

  @Delete('threads')
  delete(
    @Query() thread: ThreadDTO,
  ): Promise<OpenAI.Beta.Threads.ThreadDeleted> {
    return this.threadService.delete(thread.id);
  }

  @Delete('threads/:threadId/runs/:runId')
  cancelRun(@Param() params: any): Promise<OpenAI.Beta.Threads.Runs.Run> {
    return this.threadService.cancelRun(params.threadId, params.runId);
  }
}
