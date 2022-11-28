import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsInt, IsNumber, IsObject, IsOptional, IsPositive, IsString, Length, ValidateNested } from "class-validator";
import { Auto } from '../../autos/entities/auto.entity';


export class CreateAcademicoDto {

    @IsString()
    @Length(1,20)
    nombre: string;

    @IsString()
    @Length(1,20)
    primerApellido: string;

    @IsString()
    @Length(1,20)
    segundoApellido:string;

    @IsString()
    @Length(1,18)
    matricula: string;

    @IsInt()
    @IsPositive()
    @IsOptional()
    autosNo?: number;

    @IsString()
    @Length(1,100)
    fotoUrl: string;


    @IsArray()
    @IsOptional()
    autos?: Auto[];


}
