import { Router } from 'express'
import { Service, Container } from 'typedi'

import PingController from '../../controllers/PingController'
import UserAccountController from '../../controllers/UserAccountController'

@Service()
class Routes {
  initialize = (): Router => {
    const router = Router()

    const pingController = Container.get(PingController)
    const userAccountController = Container.get(UserAccountController)

    router.get('/ping', pingController.index)
    router.post('/user/register', userAccountController.index)

    return router
  }
}

export default Routes
