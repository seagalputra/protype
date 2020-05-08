import express from 'express'
import expressLoader from './express'

const loaders = async ({ expressApp }: { expressApp: express.Application }) => {
  await expressLoader({ app: expressApp })
  console.log('Express Initialized')
}

export default loaders
