import { Request, Response } from 'express'
import { Service } from 'typedi'

import BaseController from './BaseController'

@Service()
class PingController extends BaseController {
  index = (request: Request, response: Response) => {
    return response.json(this.successResponse({ message: 'pong' }))
  }
}

export default PingController
