import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, BaseEntity, OneToMany } from "typeorm";
import { Location } from "./Location";


@Entity()
export class Bus extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;


    @OneToMany(type => Location, loc => loc.bus_id, { onDelete: "CASCADE" })
    lokace!: Location[]


    @Column('varchar', { length: 50, nullable: true })
    name!: string;




    // @Column("text")
    // desc!: string;

    // @Column()
    // author!: string;

    // @ManyToOne(type => Author, author => author.id, { onDelete: "CASCADE", onUpdate: "NO ACTION" })
    // author!: Author;

    // @ManyToMany(type => Category, {
    //     cascade: true
    // })
    // @JoinTable()
    // categories: Category[];

}