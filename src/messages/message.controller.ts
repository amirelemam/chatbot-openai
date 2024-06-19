import { Controller, Post, Body } from '@nestjs/common';
import { MessageService } from './message.service';
import OpenAI from 'openai';
import { MessageDTO } from './message.type';

@Controller()
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('messages')
  addMessageToThread(
    @Body() body: MessageDTO,
  ): Promise<OpenAI.Beta.Threads.Runs.Run> {
    const { threadId, content, assistantId } = body;
    return this.messageService.addMessageToThread(
      threadId,
      content,
      assistantId,
    );
  }
}
