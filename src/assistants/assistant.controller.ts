import { Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common';
import { AssistantService } from './assistant.service';
import OpenAI from 'openai';
import { AssistantDTO } from './assistant.type';

@Controller()
export class AssistantController {
  constructor(private readonly assistantService: AssistantService) {}

  @Post('assistants')
  createAssistant(): Promise<OpenAI.Beta.Assistants.Assistant> {
    return this.assistantService.createAssistant();
  }

  @Get('assistants')
  listAssistants(
    @Query() assistant?: AssistantDTO,
  ): Promise<
    OpenAI.Beta.Assistants.Assistant | OpenAI.Beta.Assistants.AssistantsPage
  > {
    if (assistant.id) {
      return this.assistantService.listAssistantById(assistant.id);
    } else {
      return this.assistantService.listAssistants();
    }
  }

  @Patch('assistants')
  updateAssistant(
    @Query() assistant: AssistantDTO,
  ): Promise<OpenAI.Beta.Assistants.Assistant> {
    return this.assistantService.updateAssistant(assistant.id);
  }

  @Delete('assistants')
  deleteAssistant(
    @Query() assistant: AssistantDTO,
  ): Promise<OpenAI.Beta.Assistants.AssistantDeleted> {
    return this.assistantService.deleteAssistant(assistant.id);
  }
}
