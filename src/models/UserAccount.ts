import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
class UserAccount {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  firstName!: string

  @Column()
  lastName!: string

  @Column()
  email!: string

  @Column()
  password!: string
}

export default UserAccount
