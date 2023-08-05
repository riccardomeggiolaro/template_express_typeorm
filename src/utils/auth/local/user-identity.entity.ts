import { Entity, Column, BaseEntity, CreateDateColumn, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { UserORM } from "../../../api/user/user.entity";

@Entity("userIdentity")
export class UserIdentityORM extends BaseEntity {
    @PrimaryGeneratedColumn()
    ID: number

    @Column({type: "varchar", default: "local"})
    provider: string;

    @Column({type: "varchar", length: 50})
    username: string

    @Column({type: "varchar"})
    hashedPassword: string

    @ManyToOne(() => UserORM, user => user.id)
    user: UserORM;
}
