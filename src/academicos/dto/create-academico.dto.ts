import { IsInt, IsNumber, IsOptional, IsPositive, IsString, Length } from "class-validator";


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


}
