import { Request, Response } from 'express'
import { Service } from 'typedi'

import GenericResponse from '../../dto/GenericResponse'

import {
  UserAccountRequest,
  UserAccountResponse,
} from '../../dto/UserAccountDto'
import UserAccountService from '../../services/UserAccountService'

@Service()
class UserAccountController {
  private userAccountService: UserAccountService

  constructor(userAccountService: UserAccountService) {
    this.userAccountService = userAccountService
  }

  index = async (request: Request, response: Response) => {
    const userAccountResponse: UserAccountResponse = await this.userAccountService.registerUser(
      request.body as UserAccountRequest
    )

    return response.json(
      GenericResponse.successResponse<UserAccountResponse>(userAccountResponse)
    )
  }
}

export default UserAccountController
