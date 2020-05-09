import { Service } from 'typedi'
import { InjectRepository } from 'typeorm-typedi-extensions'
import bcrypt from 'bcrypt'
import jsonwebtoken, { Secret } from 'jsonwebtoken'

import config from '../config'

import UserAccountRepository from '../repository/UserAccountRepository'
import { UserAccountRequest, UserAccountResponse } from '../dto/UserAccountDto'

@Service()
class UserAccountService {
  constructor(
    @InjectRepository()
    private readonly userAccountRepository: UserAccountRepository
  ) {}

  public registerUser = async (
    userAccountRequest: UserAccountRequest
  ): Promise<UserAccountResponse> => {
    const { password } = userAccountRequest
    const hashedPassword = await bcrypt.hash(password, 10)

    await this.userAccountRepository.save({
      ...userAccountRequest,
      password: hashedPassword,
    })

    const token = this.generateToken(userAccountRequest.email)

    return {
      token,
    }
  }

  public getUser = async (userAccountRequest: UserAccountRequest) => {
    const { email } = userAccountRequest

    const exsistUser = await this.userAccountRepository.findOne(email)

    if (!exsistUser) return null

    return exsistUser
  }

  private generateToken = <T>(payload: T) => {
    const { secretKey } = config
    const expiration = '6h'

    return jsonwebtoken.sign({ payload }, secretKey as Secret, {
      expiresIn: expiration,
    })
  }
}

export default UserAccountService
