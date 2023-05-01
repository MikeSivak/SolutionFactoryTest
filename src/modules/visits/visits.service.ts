import { Injectable, Inject, BadRequestException, NotFoundException } from '@nestjs/common';
import { VISIT_REPOSITORY } from 'src/core/constants';
import { Visit } from './visit.enity';
import { VisitDto } from './dto/visit.dto';
import { Box } from '../boxes/box.entity';
import { BoxesService } from '../boxes/boxes.service';

@Injectable()
export class VisitsService {
    constructor(
        @Inject(VISIT_REPOSITORY)
        private readonly visitsRepository: typeof Visit,
        @Inject(BoxesService)
        private readonly boxesService: BoxesService,
    ) { }

    async create(visit: VisitDto, userId: number): Promise<Visit> {
        const box: Box = await this.boxesService.findOne(visit.boxId);
        if (!box) {
            throw new NotFoundException('This Box doesn\'t exist');
        }
        if (!box.state) {
            throw new BadRequestException('This box is busy');
        }
        await this.boxesService.update(box.id, { number: box.number, state: false });
        return await this.visitsRepository.create<Visit>({ ...visit, userId });
    }

    async findAll(): Promise<Visit[]> {
        return await this.visitsRepository.findAll<Visit>();
    }

    async findOne(id: number): Promise<Visit> {
        return await this.visitsRepository.findOne({ where: { id } });
    }

    async delete(id: number): Promise<number> {
        const visit = await this.findOne(id);
        const box: Box = await this.boxesService.findOne(visit.boxId);
        await this.boxesService.update(box.id, { number: box.number, state: true });
        return await this.visitsRepository.destroy({ where: { id } });
    }

    async update(id: number, visit: VisitDto): Promise<any> {
        const [numberOfAffectedRows, [updatedVisit]] = await this.visitsRepository
            .update({ ...visit }, { where: { id }, returning: true });
        return { numberOfAffectedRows, updatedVisit };
    }
}