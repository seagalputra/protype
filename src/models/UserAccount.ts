import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
class UserAccount {
  @PrimaryGeneratedColumn({
    name: 'id',
  })
  id!: number

  @Column({
    name: 'first_name',
  })
  firstName!: string

  @Column({
    name: 'last_name',
  })
  lastName!: string

  @Column({
    name: 'email',
  })
  email!: string

  @Column({
    name: 'password',
  })
  password!: string
}

export default UserAccount
