import { Module } from '@nestjs/common';
import { VectorStoreController } from './vector_store.controller';
import { VectorStoreService } from './vector_store.service';

@Module({
  imports: [],
  controllers: [VectorStoreController],
  providers: [VectorStoreService],
})
export class VectorStoreModule {}
