import { Service } from 'typedi'
import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'

import GenericResponse from '../../dto/GenericResponse'

@Service()
class BaseValidator {
  validate = (request: Request, response: Response, next: NextFunction) => {
    const errors = validationResult(request)

    if (errors.isEmpty()) return next()

    return response
      .status(422)
      .json(GenericResponse.errorResponse('Invalid value!'))
  }
}

export default BaseValidator
