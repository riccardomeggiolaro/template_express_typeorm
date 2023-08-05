import { Entity, Column, BaseEntity, CreateDateColumn, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { UserIdentityORM } from "../../utils/auth/local/user-identity.entity";

@Entity("users")
export class UserORM extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "varchar"})
    firstName: string;

    @Column({type: "varchar"})
    lastName: string;

    @Column({type: "varchar"})
    picture: URL;

    @OneToMany(() => UserIdentityORM, userIdentity => userIdentity.ID)
    userIdentity: UserIdentityORM[];
}
