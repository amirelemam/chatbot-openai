import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import * as dotenv from 'dotenv';
import { MessageDTO } from './thread.type';

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

@Injectable()
export class ThreadService {
  async create(): Promise<OpenAI.Beta.Threads.Thread> {
    const emptyThread = await openai.beta.threads.create();

    return emptyThread;
  }

  async createAndRun(
    assistantId: string,
    messages: MessageDTO[],
  ): Promise<OpenAI.Beta.Threads.Runs.Run> {
    const run = await openai.beta.threads.createAndRun({
      assistant_id: assistantId,
      thread: {
        messages,
      },
    });

    return run;
  }
  async createRun(
    threadId: string,
    assistantId: string,
  ): Promise<OpenAI.Beta.Threads.Runs.Run> {
    const run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: assistantId,
    });

    return run;
  }

  async getById(threadId: string): Promise<OpenAI.Beta.Threads.Thread> {
    const thread = await openai.beta.threads.retrieve(threadId);

    return thread;
  }

  async getRunSteps(
    threadId: string,
    runId: string,
  ): Promise<OpenAI.Beta.Threads.Runs.RunStepsPage> {
    const runStep = await openai.beta.threads.runs.steps.list(threadId, runId);

    return runStep;
  }

  async getRunStep(
    threadId: string,
    runId: string,
    stepId: string,
  ): Promise<OpenAI.Beta.Threads.Runs.RunStep> {
    const runStep = await openai.beta.threads.runs.steps.retrieve(
      threadId,
      runId,
      stepId,
    );

    return runStep;
  }

  async update(threadId: string): Promise<OpenAI.Beta.Threads.Thread> {
    const thread = await openai.beta.threads.retrieve(threadId);

    return thread;
  }
  async updateRun(
    threadId: string,
    runId: string,
    body: any,
  ): Promise<OpenAI.Beta.Threads.Runs.Run> {
    const run = await openai.beta.threads.runs.update(threadId, runId, body);

    return run;
  }

  async delete(threadId: string): Promise<OpenAI.Beta.Threads.ThreadDeleted> {
    const threadDeleted = await openai.beta.threads.del(threadId);

    return threadDeleted;
  }

  async cancelRun(
    threadId: string,
    runId: string,
  ): Promise<OpenAI.Beta.Threads.Runs.Run> {
    const runCancelled = await openai.beta.threads.runs.cancel(threadId, runId);

    return runCancelled;
  }

  async getRuns(threadId: string): Promise<OpenAI.Beta.Threads.Runs.RunsPage> {
    const runs = await openai.beta.threads.runs.list(threadId);

    return runs;
  }

  async getRun(
    threadId: string,
    runId: string,
  ): Promise<OpenAI.Beta.Threads.Runs.Run> {
    const run = await openai.beta.threads.runs.retrieve(threadId, runId);

    return run;
  }
}
