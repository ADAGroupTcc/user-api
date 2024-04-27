import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthController } from './health/health.controller';
import { UsersModule } from './users/users.module';

const MONGO_CERT = require('../mongodb_cert.pem');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    MongooseModule.forRoot(process.env.DATABASE_URL, {
      authMechanism: 'MONGODB-X509',
      cert: MONGO_CERT
    }),
  ],
  controllers: [HealthController],
})
export class AppModule { }
