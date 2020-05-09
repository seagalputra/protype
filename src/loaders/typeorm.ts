import { createConnection, Connection, useContainer } from 'typeorm'
import { Container } from 'typedi'
import connectionConfig from '../config/ormconfig'

export default async (): Promise<Connection> => {
  useContainer(Container)
  const connection = await createConnection(connectionConfig)
  return connection
}
