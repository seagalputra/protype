import { Request, Response } from 'express'
import { Service } from 'typedi'

import GenericResponse from '../../dto/GenericResponse'

@Service()
class PingController {
  index = (request: Request, response: Response) => {
    const {
      currentUser: { firstName, lastName },
    } = response.locals

    return response.json(
      GenericResponse.successResponse({
        message: `Hello ${firstName} ${lastName}`,
      })
    )
  }
}

export default PingController
