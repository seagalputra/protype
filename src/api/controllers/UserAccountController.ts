import { Request, Response } from 'express'
import { Service } from 'typedi'

import GenericResponse from '../../dto/GenericResponse'

import {
  UserAccountRequest,
  UserAccountResponse,
} from '../../dto/UserAccountDto'
import UserAccountService from '../../services/UserAccountService'
import {
  AuthenticationResponse,
  AuthenticationRequest,
} from '../../dto/AuthenticationDto'

@Service()
class UserAccountController {
  private userAccountService: UserAccountService

  constructor(userAccountService: UserAccountService) {
    this.userAccountService = userAccountService
  }

  userRegistration = async (request: Request, response: Response) => {
    const userAccountResponse: UserAccountResponse = await this.userAccountService.registerUser(
      request.body as UserAccountRequest
    )

    return response
      .status(200)
      .json(GenericResponse.successResponse(userAccountResponse))
  }

  userLogin = async (request: Request, response: Response) => {
    const authenticationResponse: AuthenticationResponse = await this.userAccountService.login(
      request.body as AuthenticationRequest
    )

    return authenticationResponse.token
      ? response
          .status(200)
          .json(GenericResponse.successResponse(authenticationResponse))
      : response
          .status(401)
          .json(GenericResponse.errorResponse("Password doesn't match"))
  }
}

export default UserAccountController
