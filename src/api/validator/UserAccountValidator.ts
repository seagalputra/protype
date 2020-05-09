import { Service } from 'typedi'
import { Request, Response, NextFunction } from 'express'
import { body, validationResult } from 'express-validator'

@Service()
class UserAccountValidator {
  rules = () => {
    return [
      body('firstName').isString(),
      body('lastName').isString(),
      body('email').isString(),
      body('password').isString(),
    ]
  }

  validate = (request: Request, response: Response, next: NextFunction) => {
    const errors = validationResult(request)

    if (errors.isEmpty()) return next()

    return response.status(422).json({
      errors: errors.array(),
    })
  }
}

export default UserAccountValidator
