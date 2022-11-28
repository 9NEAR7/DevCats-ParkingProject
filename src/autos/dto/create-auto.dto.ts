import { IsOptional, IsString, Length } from "class-validator";


export class CreateAutoDto {


    @IsString()
    @Length(4,10)
    matriculaAuto: string;

    @IsString()
    @IsOptional()
    marca?: string;

    @IsString()
    @IsOptional()
    color?: string;
}
