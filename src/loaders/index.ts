import express from 'express'
import expressLoader from './express'
import typeormLoader from './typeorm'
import Logger from './logger'

const loaders = async ({ expressApp }: { expressApp: express.Application }) => {
  await typeormLoader()
  Logger.info('Database connected')

  await expressLoader({ app: expressApp })
  Logger.info('Express Initialized')
}

export default loaders
