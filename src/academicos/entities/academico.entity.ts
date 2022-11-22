import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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


    
    @BeforeInsert()
    checkNombre(){
        this.nombre = this.nombre.toUpperCase();
        this.primerApellido = this.primerApellido.toUpperCase();
        this.segundoApellido = this.segundoApellido.toUpperCase();
        this.matricula = this.matricula.toUpperCase();
    }
}
