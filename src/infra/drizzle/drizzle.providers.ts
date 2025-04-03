import { DrizzleMySqlModule } from '@knaadh/nestjs-drizzle-mysql2';
import { appConfig } from 'src/config';
import * as schema from '../../db/schema';

export const DrizzleService = 'DrizzleService';
export const drizzleProvider = DrizzleMySqlModule.register({
  tag: DrizzleService,
  mysql: { ...appConfig.mysql, connection: 'client' },
  config: { schema, mode: 'default' },
});
