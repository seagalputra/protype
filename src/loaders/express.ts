import express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import { Container } from 'typedi'

import Routes from '../api/routes/v1'

const expressLoader = async ({ app }: { app: express.Application }) => {
  app.use(bodyParser.json())
  app.use(cors())
  app.use(helmet())
  app.use(morgan('tiny'))

  const routes = Container.get(Routes)
  app.use('/api/v1', routes.initialize())

  return app
}

export default expressLoader
