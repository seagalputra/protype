import dotenv from 'dotenv'

dotenv.config()

export default {
  port: process.env.PORT,
  secretKey: process.env.SECRET_KEY,
  database: {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    name: process.env.DATABASE_NAME,
  },
  logLevel: process.env.LOG_LEVEL,
}
