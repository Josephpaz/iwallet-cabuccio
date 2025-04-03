import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrizzleModule } from './infra/drizzle/drizzle.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [DrizzleModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
