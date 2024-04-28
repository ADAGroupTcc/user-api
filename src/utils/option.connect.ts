import { MongooseModuleOptions } from "@nestjs/mongoose"
import { ServerApiVersion } from "mongodb"

export const localDbOptions: MongooseModuleOptions = {
  retryAttempts: 1,
  retryDelay: Number(process.env.RETRY_DELAY),
}
export const serverDbOptions: MongooseModuleOptions = {
  authMechanism: 'MONGODB-X509',
  tls: true,
  cert: process.env.CERT,
  key: process.env.KEY,
  serverApi: ServerApiVersion.v1,
  retryAttempts: Number(process.env.RETRY_ATTEMPTS),
  retryDelay: Number(process.env.RETRY_DELAY),
}