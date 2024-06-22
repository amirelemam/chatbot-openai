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
import {
  CreateThreadDTO,
  UpdateThreadDTO,
  ThreadWithMessagesDTO,
  RunDTO,
} from './thread.type';

@Controller()
export class ThreadController {
  constructor(private readonly threadService: ThreadService) {}

  @Post('threads')
  create(@Body() thread: CreateThreadDTO): Promise<OpenAI.Beta.Threads.Thread> {
    const { messages = [], toolResources = null } = thread;

    return this.threadService.create(messages, toolResources);
  }

  @Post('threads/:threadId/runs')
  createRun(
    @Param() params: any,
    @Body() body: RunDTO,
  ): Promise<OpenAI.Beta.Threads.Runs.Run> {
    const { assistantId } = body;
    const { threadId } = params;
    return this.threadService.createRun(threadId, assistantId);
  }

  @Post('threads/runs')
  createThreadAndRun(
    @Body() threadWithMessages: ThreadWithMessagesDTO,
  ): Promise<OpenAI.Beta.Threads.Runs.Run> {
    const { assistantId, messages } = threadWithMessages;
    return this.threadService.createAndRun(assistantId, messages);
  }

  @Get('threads/:threadId')
  get(@Param() params: any): Promise<OpenAI.Beta.Threads.Thread> | object {
    return this.threadService.getById(params.threadId);
  }

  @Get('threads/:threadId/runs/:runId')
  getRunById(@Param() params: any): Promise<OpenAI.Beta.Threads.Runs.Run> {
    return this.threadService.getRunById(params.threadId, params.runId);
  }

  @Get('threads/:threadId/runs')
  getRuns(@Param() params: any): Promise<OpenAI.Beta.Threads.Runs.RunsPage> {
    return this.threadService.getRuns(params.threadId);
  }

  @Get('threads/:threadId/runs/:runId/steps')
  getRunSteps(
    @Param() params: any,
  ): Promise<OpenAI.Beta.Threads.Runs.RunStepsPage> {
    return this.threadService.getRunSteps(params.threadId, params.runId);
  }

  @Get('threads/:threadId/runs/:runId/steps/:stepId')
  getRunStepById(
    @Param() params: any,
  ): Promise<OpenAI.Beta.Threads.Runs.RunStep> {
    return this.threadService.getRunStepById(
      params.threadId,
      params.runId,
      params.stepId,
    );
  }

  @Post('threads')
  update(
    @Query() thread: UpdateThreadDTO,
  ): Promise<OpenAI.Beta.Threads.Thread> {
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
    @Query() threadId: string,
  ): Promise<OpenAI.Beta.Threads.ThreadDeleted> {
    return this.threadService.delete(threadId);
  }

  @Delete('threads/:threadId/runs/:runId')
  cancelRun(@Param() params: any): Promise<OpenAI.Beta.Threads.Runs.Run> {
    return this.threadService.cancelRun(params.threadId, params.runId);
  }
}
