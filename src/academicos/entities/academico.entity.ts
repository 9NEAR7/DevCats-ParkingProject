import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Auto } from '../../autos/entities/auto.entity';

@Entity()
export class Academico {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    nombre: string;

    @Column('text')
    primerApellido: string;

    @Column('text')
    segundoApellido: string;

    @Column('text',{
        unique: true
    })
    matricula: string;

    @Column('float',{
        default: 0
    })
    autosNo: number;

    @Column('text', {
        unique: true
    })
    fotoUrl: string;

    @OneToMany(
        () => Auto,
        (auto) => auto.academico,
        {cascade: true, eager: true}
    )
    autos: Auto[];

    


    
     @BeforeInsert()
     checkNombre(){
         this.nombre = this.nombre.toUpperCase();
         this.primerApellido = this.primerApellido.toUpperCase();
         this.segundoApellido = this.segundoApellido.toUpperCase();
         this.matricula = this.matricula.toUpperCase();
     }

     @BeforeUpdate()
     checkDatosUpdate(){

         this.nombre = this.nombre.toUpperCase();
         this.primerApellido = this.primerApellido.toUpperCase();
         this.segundoApellido = this.segundoApellido.toUpperCase();
         this.matricula = this.matricula.toUpperCase();

     }
}
