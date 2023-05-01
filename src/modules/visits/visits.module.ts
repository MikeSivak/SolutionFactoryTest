import { Module } from '@nestjs/common';
import { VisitsService } from './visits.service';
import { VisitsController } from './visits.controller';
import { visitsProvider } from './visits.providers';

@Module({
  providers: [VisitsService, ...visitsProvider],
  controllers: [VisitsController]
})
export class VisitsModule { }