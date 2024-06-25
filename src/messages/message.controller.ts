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
    @Query() query: MessageDTO,
  ): Promise<
    | OpenAI.Beta.Threads.Messages.MessagesPage
    | OpenAI.Beta.Threads.Messages.Message
  > {
    if (query.id) {
      return this.messageService.getById(query.id, query.threadId);
    }
    return this.messageService.getAllByThread(query.threadId);
  }

  @Post('messages')
  update(
    @Body() newMessage: NewMessageDTO,
  ): Promise<OpenAI.Beta.Threads.Messages.Message> {
    return this.messageService.update(newMessage);
  }

  @Delete('messages')
  delete(
    @Query() query: MessageDTO,
  ): Promise<OpenAI.Beta.Threads.Messages.MessageDeleted> {
    return this.messageService.delete(query.id, query.threadId);
  }
}
