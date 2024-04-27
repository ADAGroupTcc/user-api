import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServerApiVersion } from 'mongodb';
import { HealthController } from './health/health.controller';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    MongooseModule.forRoot(process.env.DATABASE_URL, {
      authMechanism: 'MONGODB-X509',
      tls: true,
      cert: process.env.CERT,
      key: process.env.KEY,
      serverApi: ServerApiVersion.v1,
      retryAttempts: Number(process.env.RETRY_ATTEMPTS),
      retryDelay: Number(process.env.RETRY_DELAY),
    }),
  ],
  controllers: [HealthController],
})
export class AppModule { }
