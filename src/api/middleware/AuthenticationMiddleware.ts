import { Request, Response, NextFunction } from 'express'
import jsonwebtoken, { Secret } from 'jsonwebtoken'
import { Service } from 'typedi'

import UserAccount from '../../models/UserAccount'
import GenericResponse from '../../dto/GenericResponse'
import UserAccountService from '../../services/UserAccountService'
import { UserAccountRequest } from '../../dto/UserAccountDto'
import TokenData from '../../dto/TokenData'
import config from '../../config'

@Service()
class AuthenticationMiddleware {
  constructor(private userAccountService: UserAccountService) {}

  authenticate = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const token: string | null = this.getTokenFromHeader(request)

    if (!token)
      return response
        .status(401)
        .json(GenericResponse.errorResponse('Unauthorized'))

    const result = this.verifyToken(token)

    try {
      const existUser: UserAccount = await this.userAccountService.getUser({
        email: result.payload,
      } as UserAccountRequest)

      response.locals.currentUser = existUser
      return next()
    } catch (e) {
      return response
        .status(401)
        .json(GenericResponse.errorResponse("User doesn't exist!"))
    }
  }

  verifyToken = (token: string): TokenData => {
    const { secretKey } = config
    return jsonwebtoken.verify(token, secretKey as Secret) as TokenData
  }

  getTokenFromHeader = (request: Request): string | null => {
    const { authorization } = request.headers
    return authorization && authorization.split(' ')[0] === 'Bearer'
      ? authorization.split(' ')[1]
      : null
  }
}

export default AuthenticationMiddleware
