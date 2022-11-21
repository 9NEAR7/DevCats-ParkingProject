import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Academico {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column('text')
    nombre: string;

    @Column('text')
    primerApellido: string;

    @Column('text')
    segundoApellido: string;

    @Column('text',{
        unique: true
    })
    curp: string;

    @Column('float',{
        default: 0
    })
    autosNo: number;

    @Column('text', {
        unique: true
    })
    fotoUrl: string;


}
