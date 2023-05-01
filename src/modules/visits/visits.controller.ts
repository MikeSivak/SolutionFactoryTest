import { Controller, UseGuards, Get, Post, Put, Delete, Body, Request, Param, NotFoundException } from '@nestjs/common';
import { VisitsService } from './visits.service';
import { Visit } from './visit.enity';
import { AuthGuard } from '@nestjs/passport';
import { VisitDto } from './dto/visit.dto';

@Controller('visits')
export class VisitsController {
    constructor(private readonly visitsService: VisitsService) { }

    @Get()
    async findAll() {
        return await this.visitsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Visit> {
        const visit = await this.visitsService.findOne(id);
        if (!visit) {
            throw new NotFoundException('This Visit doesn\t exist');
        }
        return visit;
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(@Body() visit: VisitDto, @Request() req: any): Promise<Visit> {
        const newVisit = await this.visitsService.create(visit, req.user.id);
        return newVisit;
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async update(@Param('id') id: number, @Body() visit: VisitDto): Promise<Visit> {
        const { numberOfAffectedRows, updatedVisit } = await this.visitsService.update(id, visit);
        if (numberOfAffectedRows === 0) {
            throw new NotFoundException('This Visit doesn\'t exist');
        }
        return updatedVisit;
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<string> {
        const deleted = await this.visitsService.delete(id);
        if (deleted === 0) {
            throw new NotFoundException('This Visit doesn\'t exist');
        }
        return 'Successfully deleted';
    }
}