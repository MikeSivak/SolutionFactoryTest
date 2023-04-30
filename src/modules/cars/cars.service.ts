import { Injectable, Inject } from '@nestjs/common';
import { User } from '../users/user.entity';
import { CARS_REPOSITORY } from 'src/core/constants';
import { Car } from './car.entity';
import { CarDto } from './dto/car.dto';


@Injectable()
export class CarsService {
    constructor(@Inject(CARS_REPOSITORY) private readonly carsRepository: typeof Car) { }

    async create(car: CarDto, userId: number): Promise<Car> {
        return await this.carsRepository.create<Car>({ ...car, userId });
    }

    async findAll(): Promise<Car[]> {
        return await this.carsRepository.findAll<Car>({
            include: [{ model: User, attributes: { exclude: ['password'] } }],
        });
    }

    async findOne(id: number): Promise<Car> {
        return await this.carsRepository.findOne({
            where: { id },
            include: [{ model: User, attributes: { exclude: ['password'] } }],
        });
    }

    async delete(id: number, userId: number) {
        return await this.carsRepository.destroy({ where: { id, userId } });
    }

    async update(id: number, data, userId: number) {
        const [numberOfAffectedRows, [updatedCar]] = await this.carsRepository.update({ ...data }, { where: { id, userId }, returning: true });

        return { numberOfAffectedRows, updatedCar };
    }
}