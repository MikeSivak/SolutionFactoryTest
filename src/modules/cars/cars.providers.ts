import { CAR_REPOSITORY } from "src/core/constants";
import { Car } from "./car.entity";

export const carsProviders = [{
    provide: CAR_REPOSITORY,
    useValue: Car,
}];