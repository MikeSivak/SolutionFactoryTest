import { Injectable, Inject } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { BoxesService } from '../boxes/boxes.service';
import { Box } from '../boxes/box.entity';
import { VisitsService } from '../visits/visits.service';
import { Visit } from '../visits/visit.enity';

@Injectable()
export class CronjobsService {
    constructor(
        @Inject(BoxesService)
        private readonly boxesService: BoxesService,
        @Inject(VisitsService)
        private readonly visitsService: VisitsService,
    ) { }

    @Cron('*/5 * * * * *')
    async openForBusiness() {
        const visits: Visit[] = await this.visitsService.findAll();
        visits.map(async (visit) => {
            const diffTime = Math.floor((((new Date()).getTime() - visit.createdAt.getTime()) / 1000 / 60) % 60);
            if (diffTime >= 60) {
                await this.boxesService.update(visit.boxId, { state: true });
            }
        });
    }
}