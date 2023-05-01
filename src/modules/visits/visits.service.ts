import { Injectable, Inject } from '@nestjs/common';
import { VISIT_REPOSITORY } from 'src/core/constants';
import { Visit } from './visit.enity';
import { VisitDto } from './dto/visit.dto';

@Injectable()
export class VisitsService {
    constructor(@Inject(VISIT_REPOSITORY) private readonly visitsRepository: typeof Visit) { }

    async create(visit: VisitDto): Promise<Visit> {
        return await this.visitsRepository.create<Visit>(visit);
    }

    async findAll(): Promise<Visit[]> {
        return await this.visitsRepository.findAll<Visit>();
    }

    async findOne(id: number): Promise<Visit> {
        return await this.visitsRepository.findOne({ where: { id } });
    }

    async delete(id: number): Promise<number> {
        return await this.visitsRepository.destroy({ where: { id } });
    }

    async update(id: number, visit: VisitDto): Promise<any> {
        const [numberOfAffectedRows, [updatedVisit]] = await this.visitsRepository
            .update({ ...visit }, { where: { id }, returning: true });
        return { numberOfAffectedRows, updatedVisit };
    }
}