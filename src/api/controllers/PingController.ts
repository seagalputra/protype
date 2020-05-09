import { Request, Response } from 'express'
import { Service } from 'typedi'

import GenericResponse from '../../dto/GenericResponse'

@Service()
class PingController {
  index = (request: Request, response: Response) => {
    return response.json(GenericResponse.successResponse({ message: 'pong' }))
  }
}

export default PingController
