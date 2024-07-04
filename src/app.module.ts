import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssistantModule } from './assistants/assistant.module';
import { ThreadModule } from './threads/thread.module';
import { MessageModule } from './messages/message.module';
import { VectorStoreModule } from './vector_stores/vector_store.module';

@Module({
  imports: [AssistantModule, ThreadModule, MessageModule, VectorStoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
