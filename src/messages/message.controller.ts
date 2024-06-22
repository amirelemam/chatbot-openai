import { Controller, Post, Body, Get, Delete, Query } from '@nestjs/common';
import { MessageService } from './message.service';
import OpenAI from 'openai';
import { MessageDTO, NewMessageDTO } from './message.type';

@Controller()
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('messages')
  create(
    @Body() body: MessageDTO,
  ): Promise<OpenAI.Beta.Threads.Messages.Message> {
    const { threadId, content } = body;
    return this.messageService.addMessageToThread(threadId, content);
  }

  @Get('messages')
  get(
    @Query() message: MessageDTO,
  ): Promise<
    | OpenAI.Beta.Threads.Messages.MessagesPage
    | OpenAI.Beta.Threads.Messages.Message
  > {
    if (message.id) {
      return this.messageService.getById(message.id, message.threadId);
    }
    return this.messageService.getAllByThread(message.threadId);
  }

  @Post('messages')
  update(
    @Body() newMessage: NewMessageDTO,
  ): Promise<OpenAI.Beta.Threads.Messages.Message> {
    return this.messageService.update(
      newMessage.messageId,
      newMessage.threadId,
      newMessage.metadata,
    );
  }

  @Delete('messages')
  delete(
    @Query() message: MessageDTO,
  ): Promise<OpenAI.Beta.Threads.Messages.MessageDeleted> {
    return this.messageService.delete(message.id, message.threadId);
  }
}
