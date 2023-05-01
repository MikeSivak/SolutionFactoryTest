import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CarsService } from './cars.service';
import { Car } from './car.entity';
import { CarDto } from './dto/car.dto';

@Controller('cars')
export class CarsController {
    constructor(private readonly carsService: CarsService) { }

    @Get()
    async findAll(): Promise<Car[]> {
        return await this.carsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Car> {
        const car = await this.carsService.findOne(id);
        if (!car) {
            throw new NotFoundException('This Car doesn\'t exist');
        }
        return car;
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(@Body() car: CarDto, @Request() req: any): Promise<Car> {
        console.log(req.user.id)
        return await this.carsService.create(car, req.user.id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async update(@Param('id') id: number, @Body() car: CarDto, @Request() req: any): Promise<Car> {
        const { numberOfAffectedRows, updatedCar } = await this.carsService.update(id, car, req.user.id);
        if (numberOfAffectedRows === 0) {
            throw new NotFoundException('This Car doesn\'t exist');
        }
        return updatedCar;
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req: any): Promise<string> {
        const deleted = await this.carsService.delete(id, req.user.id);
        if (deleted === 0) {
            throw new NotFoundException('This Car doesn\'t exist');
        }
        return 'Successfully deleted';
    }
}