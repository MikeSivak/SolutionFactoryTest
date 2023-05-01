import { Body, Controller, Get, Post, Put, Delete, UseGuards, Param, NotFoundException } from '@nestjs/common';
import { BoxesService } from './boxes.service';
import { Box } from './box.entity';
import { AuthGuard } from '@nestjs/passport';
import { BoxDto } from './dto/box.dto';

@Controller('boxes')
export class BoxesController {
    constructor(private readonly boxesService: BoxesService) { }

    @Get()
    async findAll() {
        return await this.boxesService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Box> {
        const box = await this.boxesService.findOne(id);
        if (!box) {
            throw new NotFoundException('This Box doesn\'t exist');
        }
        return box;
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(@Body() box: BoxDto): Promise<Box> {
        const newBox = await this.boxesService.create(box);
        return newBox;
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async update(@Param('id') id: number, @Body() box: BoxDto): Promise<Box> {
        const { numberOfAffectedRows, updatedBox } = await this.boxesService.update(id, box);
        if (numberOfAffectedRows === 0) {
            throw new NotFoundException('This Box doesn\'t exist');
        }
        return updatedBox;
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<string> {
        const deleted = await this.boxesService.delete(id);
        if (deleted === 0) {
            throw new NotFoundException('This Box doesn\'t exist');
        }
        return 'Successfully deleted';
    }
}
