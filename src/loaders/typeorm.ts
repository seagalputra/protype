import {
  ConnectionOptions,
  createConnection,
  Connection,
  useContainer,
} from 'typeorm'
import { Container } from 'typedi'
import config from '../config'

const connectionConfig: ConnectionOptions = {
  type: 'postgres',
  host: config.database.host,
  port: Number(config.database.port),
  username: config.database.user,
  password: config.database.password,
  database: config.database.name,
  entities: [__dirname + '/../models/*{.ts,.js}'],
  synchronize: true,
}

export default async (): Promise<Connection> => {
  useContainer(Container)
  const connection = await createConnection(connectionConfig)
  return connection
}
