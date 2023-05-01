import { IsNotEmpty } from "class-validator";

export class BoxDto {
    @IsNotEmpty()
    readonly number: string;
    @IsNotEmpty()
    readonly state: Boolean;
}