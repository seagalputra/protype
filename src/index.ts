import 'reflect-metadata'
import express from 'express'
import loaders from './loaders'
import config from './config'
import Logger from './loaders/logger'

const startServer = async () => {
  const app: express.Application = express()

  await loaders({ expressApp: app })

  app.listen(config.port, () => {
    Logger.info(`Server listening on port ${config.port}`)
  })
}

startServer()
