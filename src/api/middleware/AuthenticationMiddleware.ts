import { Request, Response, NextFunction } from 'express'
import jsonwebtoken, { Secret } from 'jsonwebtoken'
import { Container, Service } from 'typedi'

import GenericResponse from '../../dto/GenericResponse'
import UserAccountService from '../../services/UserAccountService'
import { UserAccountRequest } from '../../dto/UserAccountDto'
import TokenData from '../../dto/TokenData'
import config from '../../config'

@Service()
class AuthenticationMiddleware {
  authenticate = (request: Request, response: Response, next: NextFunction) => {
    const token: string | null = this.getTokenFromHeader(request)

    if (!token)
      return response
        .status(401)
        .json(GenericResponse.errorResponse('Unauthorized'))

    const { secretKey } = config
    const result = jsonwebtoken.verify(token, secretKey as Secret) as TokenData
    console.log(result.payload)

    const userAccountService = Container.get(UserAccountService)
    const existUser = userAccountService.getUser({
      email: result.payload,
    } as UserAccountRequest)

    if (!existUser)
      return response
        .status(401)
        .json(GenericResponse.errorResponse("User doesn't exist!"))

    return next()
  }

  getTokenFromHeader = (request: Request): string | null => {
    const { authorization } = request.headers
    return authorization && authorization.split(' ')[0] === 'Bearer'
      ? authorization.split(' ')[1]
      : null
  }
}

export default AuthenticationMiddleware
