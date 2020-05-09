import { Service } from 'typedi'
import { body } from 'express-validator'

import BaseValidator from './BaseValidator'

@Service()
class AuthenticationValidator extends BaseValidator {
  rules = () => {
    return [body('email').isString(), body('password').isString()]
  }
}

export default AuthenticationValidator
