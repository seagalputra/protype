import { EntityRepository, Repository } from 'typeorm'
import { Service } from 'typedi'
import UserAccount from '../models/UserAccount'

@Service()
@EntityRepository(UserAccount)
class UserAccountRepository extends Repository<UserAccount> {}

export default UserAccountRepository
