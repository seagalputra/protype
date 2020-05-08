import 'reflect-metadata'
import express from 'express'
import loaders from './loaders'

const startServer = async () => {
  const app: express.Application = express()

  await loaders({ expressApp: app })

  app.listen(5000, () => {
    console.log('Server starting...')
  })
}

startServer()
