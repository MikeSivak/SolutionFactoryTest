import { Module, forwardRef } from '@nestjs/common';
import { VisitsService } from './visits.service';
import { VisitsController } from './visits.controller';
import { visitsProvider } from './visits.providers';
import { BoxesModule } from '../boxes/boxes.module';

@Module({
  providers: [VisitsService, ...visitsProvider],
  controllers: [VisitsController],
  imports: [
    forwardRef(() => BoxesModule),
  ],
  exports: [VisitsService],
})
export class VisitsModule { }