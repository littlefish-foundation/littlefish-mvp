import { Module } from '@nestjs/common';
import { ColonyController } from './colony.controller';
import { ColonyService } from './colony.service';

@Module({
  controllers: [ColonyController],
  providers: [ColonyService],
})
export class ColonyModule {}
