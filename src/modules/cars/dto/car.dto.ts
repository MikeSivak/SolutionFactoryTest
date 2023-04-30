import { IsNotEmpty } from "class-validator";

export class CarDto {
    @IsNotEmpty()
    readonly brand: string;
    @IsNotEmpty()
    readonly model: string;
    @IsNotEmpty()
    readonly number: string;
    @IsNotEmpty()
    readonly photo: string;
}