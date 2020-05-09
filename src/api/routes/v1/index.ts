import { Router } from 'express'
import { Service, Container } from 'typedi'

import PingController from '../../controllers/PingController'
import UserAccountController from '../../controllers/UserAccountController'
import UserAccountValidator from '../../validator/UserAccountValidator'

@Service()
class Routes {
  initialize = (): Router => {
    const router = Router()

    const pingController = Container.get(PingController)
    const userAccountController = Container.get(UserAccountController)
    const userAccountValidator = Container.get(UserAccountValidator)

    router.get('/ping', pingController.index)
    router.post(
      '/user/register',
      userAccountValidator.rules,
      userAccountValidator.validate,
      userAccountController.index
    )

    return router
  }
}

export default Routes
