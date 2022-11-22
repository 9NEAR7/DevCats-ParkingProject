import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Academico } from '../../academicos/entities/academico.entity';

@Entity()
export class Auto {

    @PrimaryColumn('uuid')
    id: string;

    @Column('text',{
        unique: true
    })
    matriculaAuto: string;

    @Column()
    marca: string;

    @Column()
    color: string;

    @ManyToOne(
        () => Academico,
        (academico) => academico.autos
    )
    academico: Academico


}
