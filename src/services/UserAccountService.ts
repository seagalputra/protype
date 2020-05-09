import { Service } from 'typedi'
import { InjectRepository } from 'typeorm-typedi-extensions'
import bcrypt from 'bcrypt'

import UserAccountRepository from '../repository/UserAccountRepository'
import { UserAccountRequest, UserAccountResponse } from '../dto/UserAccountDto'

@Service()
class UserAccountService {
  constructor(
    @InjectRepository()
    private readonly userAccountRepository: UserAccountRepository
  ) {}

  registerUser = async (
    userAccountRequest: UserAccountRequest
  ): Promise<UserAccountResponse> => {
    const { password } = userAccountRequest
    const hashedPassword = await bcrypt.hash(password, 10)

    await this.userAccountRepository.save({
      ...userAccountRequest,
      password: hashedPassword,
    })

    return {
      firstName: userAccountRequest.firstName,
      lastName: userAccountRequest.lastName,
      email: userAccountRequest.email,
    }
  }
}

export default UserAccountService
