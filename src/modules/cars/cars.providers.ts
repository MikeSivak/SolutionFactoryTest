import { CARS_REPOSITORY } from "src/core/constants";
import { Car } from "./car.entity";

export const carsProviders = [{
    provide: CARS_REPOSITORY,
    useValue: Car,
}];