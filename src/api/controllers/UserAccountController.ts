import { Request, Response } from 'express'
import { Service } from 'typedi'

import BaseController from './BaseController'
import UserAccountResponse from '../../dto/UserAccount/response/UserAccountResponseBuilder'
import UserAccountResponseBuilder from '../../dto/UserAccount/response/UserAccountResponseBuilder'

@Service()
class UserAccountController extends BaseController {
  index = (request: Request, response: Response) => {
    const { name, email } = request.body
    const userAccountResponse: UserAccountResponse = UserAccountResponseBuilder.anUserAccountResponseBuilder()
      .withName(name)
      .withEmail(email)

    return response.json(
      this.successResponse<UserAccountResponse>(userAccountResponse)
    )
  }
}

export default UserAccountController
