import { Column, Entity, PrimaryColumn } from "typeorm";

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


}
