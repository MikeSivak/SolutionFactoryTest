import { Module, forwardRef } from '@nestjs/common';
import { CronjobsService } from './cronjobs.service';
import { BoxesModule } from '../boxes/boxes.module';
import { VisitsModule } from '../visits/visits.module';

@Module({
  providers: [CronjobsService],
  imports: [
    forwardRef(() => BoxesModule),
    forwardRef(() => VisitsModule),
  ],
})
export class CronjobsModule { }
