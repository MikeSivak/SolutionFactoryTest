import { Injectable, Inject } from '@nestjs/common';
import { BOX_REPOSITORY } from 'src/core/constants';
import { Box } from './box.entity';
import { BoxDto } from './dto/box.dto';

@Injectable()
export class BoxesService {
    constructor(@Inject(BOX_REPOSITORY) private readonly boxesRepository: typeof Box) { }

    async create(box: BoxDto): Promise<Box> {
        return await this.boxesRepository.create<Box>(box);
    }

    async findAll(): Promise<Box[]> {
        return await this.boxesRepository.findAll<Box>();
    }

    async findOne(id: number): Promise<Box> {
        return await this.boxesRepository.findOne({ where: { id } });
    }

    async delete(id: number): Promise<number> {
        return await this.boxesRepository.destroy({ where: { id } });
    }

    async update(id: number, box: BoxDto): Promise<any> {
        const [numberOfAffectedRows, [updatedBox]] = await this.boxesRepository
            .update({ ...box }, { where: { id }, returning: true });
        return { numberOfAffectedRows, updatedBox };
    }
}