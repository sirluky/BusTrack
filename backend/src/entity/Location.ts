import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, BaseEntity, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Bus } from "./Bus";


@Entity()
export class Location extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    // @Column('int', { default: 1, nullable: true })
    // bus_id!: number

    @ManyToOne(type => Bus, bus => bus.location)
    bus!: Bus;

    // @JoinTable({
    //     name: "bus", // table name for the junction table of this relation
    //     joinColumn: {
    //         referencedColumnName: "id"
    //     }
    // })

    // @OneToMany(type => Location)
    // bus: Location

    // @Column('varchar', { length: 50, nullable: true })
    // bus_name!: string;

    @Column('double')
    lat!: number;

    @Column('double')
    lng!: number;

    @Column('double')
    alt!: number;

    @Column('float', { nullable: true })
    temperature!: number;

    @Column('float', { nullable: true })
    co2!: number;

    @CreateDateColumn({ type: 'timestamp', name: 'create_date', default: () => 'LOCALTIMESTAMP' })
    createDate!: string;


    //altitude



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