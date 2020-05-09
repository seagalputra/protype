import { Service } from 'typedi'
import { body } from 'express-validator'

import BaseValidator from './BaseValidator'

@Service()
class UserAccountValidator extends BaseValidator {
  rules = () => {
    return [
      body('firstName').isString(),
      body('lastName').isString(),
      body('email').isString(),
      body('password').isString(),
    ]
  }
}

export default UserAccountValidator
