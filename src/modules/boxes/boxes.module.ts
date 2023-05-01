import { Module } from '@nestjs/common';
import { BoxesService } from './boxes.service';
import { BoxesController } from './boxes.controller';
import { boxesProvider } from './boxes.providers';

@Module({
  providers: [BoxesService, ...boxesProvider],
  controllers: [BoxesController],
  exports: [BoxesService],
})
export class BoxesModule { }
