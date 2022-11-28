import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Academico } from '../../academicos/entities/academico.entity';

@Entity()
export class Auto {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text',{
        unique: true
    })
    matriculaAuto: string;

    @Column()
    marca: string;

    @Column()
    color: string;

    @ManyToOne(() => Academico, (academico) => academico.autos
    )
    academico: Academico;


     @BeforeInsert()
     checkMatricula(){
         this.matriculaAuto = this.matriculaAuto.toUpperCase();
         this.marca = this.marca.toUpperCase();
         this.color = this.color.toUpperCase();
     }

     @BeforeUpdate()
     checkDatos(){
        this.matriculaAuto = this.matriculaAuto.toUpperCase();
        this.marca = this.marca.toUpperCase();
        this.color = this.color.toUpperCase();
    }
     


}
