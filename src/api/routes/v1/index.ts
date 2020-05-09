import { Router } from 'express'
import { Service, Container } from 'typedi'

import PingController from '../../controllers/PingController'
import UserAccountController from '../../controllers/UserAccountController'
import UserAccountValidator from '../../validator/UserAccountValidator'
import AuthenticationMiddleware from '../../middleware/AuthenticationMiddleware'
import AuthenticationValidator from '../../validator/AuthenticationValidator'

@Service()
class Routes {
  configure = (): Router => {
    const router = Router()

    const pingController = Container.get(PingController)
    const userAccountController = Container.get(UserAccountController)
    const userAccountValidator = Container.get(UserAccountValidator)
    const authenticationMiddleware = Container.get(AuthenticationMiddleware)
    const authenticationValidator = Container.get(AuthenticationValidator)

    router.get(
      '/ping',
      authenticationMiddleware.authenticate,
      pingController.index
    )
    router.post(
      '/user/register',
      userAccountValidator.rules(),
      userAccountValidator.validate,
      userAccountController.userRegistration
    )
    router.post(
      '/user/login',
      authenticationValidator.rules(),
      authenticationValidator.validate,
      userAccountController.userLogin
    )

    return router
  }
}

export default Routes
