import { Request, Response } from 'express'
import { Service } from 'typedi'

import BaseController from './BaseController'
import {
  UserAccountRequest,
  UserAccountResponse,
} from '../../dto/UserAccountDto'
import UserAccountService from '../../services/UserAccountService'

@Service()
class UserAccountController extends BaseController {
  private userAccountService: UserAccountService

  constructor(userAccountService: UserAccountService) {
    super()
    this.userAccountService = userAccountService
  }

  index = async (request: Request, response: Response) => {
    const userAccountResponse: UserAccountResponse = await this.userAccountService.registerUser(
      request.body as UserAccountRequest
    )

    return response.json(
      this.successResponse<UserAccountResponse>(userAccountResponse)
    )
  }
}

export default UserAccountController
