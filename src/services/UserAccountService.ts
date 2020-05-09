import { Service } from 'typedi'
import { InjectRepository } from 'typeorm-typedi-extensions'
import bcrypt from 'bcrypt'
import jsonwebtoken, { Secret } from 'jsonwebtoken'

import config from '../config'

import UserAccountRepository from '../repository/UserAccountRepository'
import { UserAccountRequest, UserAccountResponse } from '../dto/UserAccountDto'
import {
  AuthenticationRequest,
  AuthenticationResponse,
} from '../dto/AuthenticationDto'
import UserAccount from '../models/UserAccount'

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

    const token = this.generateToken<String>(userAccountRequest.email)

    return {
      token,
    }
  }

  public login = async (
    authenticationRequest: AuthenticationRequest
  ): Promise<AuthenticationResponse> => {
    const { email, password } = authenticationRequest

    const user: UserAccount = await this.getUser({
      email,
    } as UserAccountRequest)

    const isPasswordMatch = await bcrypt.compare(password, user.password)

    if (!isPasswordMatch) return { token: null }

    const token = this.generateToken(user.email)

    return { token }
  }

  public getUser = (
    userAccountRequest: UserAccountRequest
  ): Promise<UserAccount> => {
    const { email } = userAccountRequest

    const exsistUser = this.userAccountRepository.findOneOrFail({
      email,
    })

    return exsistUser
  }

  private generateToken = <T>(payload: T) => {
    const { secretKey } = config
    const expiration = '3h'

    return jsonwebtoken.sign({ payload }, secretKey as Secret, {
      expiresIn: expiration,
    })
  }
}

export default UserAccountService
