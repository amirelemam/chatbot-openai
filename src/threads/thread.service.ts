import { Injectable, HttpException } from '@nestjs/common';
import OpenAI from 'openai';
import { openai } from '../openai';
import { MessageDTO, RunDTO } from './thread.type';

@Injectable()
export class ThreadService {
  async create(
    messages: MessageDTO[],
    toolResources: OpenAI.Beta.Assistants.AssistantUpdateParams.ToolResources,
  ): Promise<OpenAI.Beta.Threads.Thread> {
    try {
      return await openai.beta.threads.create({
        messages,
        tool_resources: toolResources,
      });
    } catch (error: any) {
      throw new HttpException({ message: error.message }, error.status);
    }
  }

  async createAndRun(
    assistantId: string,
    messages: MessageDTO[],
  ): Promise<OpenAI.Beta.Threads.Runs.Run> {
    try {
      return await openai.beta.threads.createAndRun({
        assistant_id: assistantId,
        thread: {
          messages,
        },
      });
    } catch (error: any) {
      throw new HttpException({ message: error.message }, error.status);
    }
  }

  async createRun(
    threadId: string,
    assistantId: string,
  ): Promise<OpenAI.Beta.Threads.Runs.Run> {
    try {
      return await openai.beta.threads.runs.create(threadId, {
        assistant_id: assistantId,
      });
    } catch (error: any) {
      throw new HttpException({ message: error.message }, error.status);
    }
  }

  async getById(threadId: string): Promise<OpenAI.Beta.Threads.Thread> {
    try {
      return await openai.beta.threads.retrieve(threadId);
    } catch (error: any) {
      throw new HttpException({ message: error.message }, error.status);
    }
  }

  async getRuns(threadId: string): Promise<OpenAI.Beta.Threads.Runs.RunsPage> {
    try {
      return await openai.beta.threads.runs.list(threadId);
    } catch (error: any) {
      throw new HttpException({ message: error.message }, error.status);
    }
  }

  async getRunById(
    threadId: string,
    runId: string,
  ): Promise<OpenAI.Beta.Threads.Runs.Run> {
    try {
      return await openai.beta.threads.runs.retrieve(threadId, runId);
    } catch (error: any) {
      throw new HttpException({ message: error.message }, error.status);
    }
  }

  async getRunSteps(
    threadId: string,
    runId: string,
  ): Promise<OpenAI.Beta.Threads.Runs.RunStepsPage> {
    try {
      return await openai.beta.threads.runs.steps.list(threadId, runId);
    } catch (error: any) {
      throw new HttpException({ message: error.message }, error.status);
    }
  }

  async getRunStepById(
    threadId: string,
    runId: string,
    stepId: string,
  ): Promise<OpenAI.Beta.Threads.Runs.RunStep> {
    try {
      return await openai.beta.threads.runs.steps.retrieve(
        threadId,
        runId,
        stepId,
      );
    } catch (error: any) {
      throw new HttpException({ message: error.message }, error.status);
    }
  }

  async update(
    threadId: string,
    toolResources: OpenAI.Beta.Assistants.AssistantUpdateParams.ToolResources,
  ): Promise<OpenAI.Beta.Threads.Thread> {
    try {
      return await openai.beta.threads.update(threadId, {
        tool_resources: toolResources,
      });
    } catch (error: any) {
      throw new HttpException({ message: error.message }, error.status);
    }
  }

  async updateRun(
    threadId: string,
    runId: string,
    body: RunDTO,
  ): Promise<OpenAI.Beta.Threads.Runs.Run> {
    try {
      return await openai.beta.threads.runs.update(threadId, runId, body);
    } catch (error: any) {
      throw new HttpException({ message: error.message }, error.status);
    }
  }

  async delete(threadId: string): Promise<OpenAI.Beta.Threads.ThreadDeleted> {
    try {
      return await openai.beta.threads.del(threadId);
    } catch (error: any) {
      throw new HttpException({ message: error.message }, error.status);
    }
  }

  async cancelRun(
    threadId: string,
    runId: string,
  ): Promise<OpenAI.Beta.Threads.Runs.Run> {
    try {
      return await openai.beta.threads.runs.cancel(threadId, runId);
    } catch (error: any) {
      throw new HttpException({ message: error.message }, error.status);
    }
  }
}
