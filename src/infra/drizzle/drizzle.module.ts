import { Module } from '@nestjs/common';
import { drizzleProvider } from './drizzle.providers';

@Module({
  imports: [drizzleProvider],
  providers: [],
  exports: [],
})
export class DrizzleModule {}
