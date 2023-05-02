import { Injectable, Inject } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Box } from '../boxes/box.entity';
import { BOX_REPOSITORY } from 'src/core/constants';
import { Op } from 'sequelize';

@Injectable()
export class CronjobsService {
    constructor(
        @Inject(BOX_REPOSITORY)
        private readonly boxesRepository: typeof Box,
    ) { }

    @Cron('*/5 * * * * *')
    async updateBoxStates() {
        const now = new Date().getTime();
        const bookingTime = now - 60 * 60 * 1000;
        const isoDate = new Date(bookingTime).toISOString();

        await this.boxesRepository.update({ state: true }, {
            where: {
                updatedAt: {
                    [Op.lte]: isoDate,
                },
            },
        });
    }
}