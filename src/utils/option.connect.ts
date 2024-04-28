import { MongooseModuleOptions } from "@nestjs/mongoose"
import { ServerApiVersion } from "mongodb"

export const localDbOptions: MongooseModuleOptions = {
  retryAttempts: 1,
  retryDelay: Number(process.env.RETRY_DELAY),
}
export const serverDbOptions: MongooseModuleOptions = {
  appName: 'adda-cluster',
  authMechanism: 'MONGODB-X509',
  authSource: '$external',
  retryWrites: true,
  w: 'majority',
  tls: true,
  cert: process.env.CERT,
  key: process.env.KEY,
  serverApi: ServerApiVersion.v1,
  retryAttempts: Number(process.env.RETRY_ATTEMPTS),
  retryDelay: Number(process.env.RETRY_DELAY),
}