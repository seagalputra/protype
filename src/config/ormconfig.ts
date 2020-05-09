import { ConnectionOptions } from 'typeorm'

import config from '.'

const connectionConfig: ConnectionOptions = {
  type: 'postgres',
  host: config.database.host,
  port: Number(config.database.port),
  username: config.database.user,
  password: config.database.password,
  database: config.database.name,
  entities: [__dirname + '/../models/*{.ts,.js}'],
  synchronize: true,
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
  logging: true,
}

export = connectionConfig
