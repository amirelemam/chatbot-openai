import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { AssistantService } from './assistant.service';
import OpenAI from 'openai';
import { AssistantDTO, CreateDTO, UpdateDTO } from './assistant.type';

@Controller()
export class AssistantController {
  constructor(private readonly assistantService: AssistantService) {}

  @Post('assistants')
  create(@Body() body: CreateDTO): Promise<OpenAI.Beta.Assistants.Assistant> {
    return this.assistantService.create(body);
  }

  @Get('assistants')
  get(
    @Query() assistant?: AssistantDTO,
  ): Promise<
    OpenAI.Beta.Assistants.Assistant | OpenAI.Beta.Assistants.AssistantsPage
  > {
    if (assistant.id) {
      return this.assistantService.getById(assistant.id);
    } else {
      return this.assistantService.getAll();
    }
  }

  @Patch('assistants')
  update(@Body() body: UpdateDTO): Promise<OpenAI.Beta.Assistants.Assistant> {
    return this.assistantService.update(body.id, body);
  }

  @Delete('assistants')
  delete(
    @Query() assistant: AssistantDTO,
  ): Promise<OpenAI.Beta.Assistants.AssistantDeleted> {
    return this.assistantService.delete(assistant.id);
  }
}
