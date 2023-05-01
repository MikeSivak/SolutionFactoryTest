import { IsNotEmpty } from "class-validator";

export class VisitDto {
    @IsNotEmpty()
    readonly userId: number;
    @IsNotEmpty()
    readonly carId: number;
    @IsNotEmpty()
    readonly boxId: number;
}