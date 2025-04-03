import { relations } from 'drizzle-orm';
import {
  decimal,
  mysqlTable,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core';
import { transaction } from './transaction.schema';
import { reversal } from './reversal.schema';

export const user = mysqlTable('user', {
  id: varchar('id', { length: 36 }).primaryKey().notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  balance: decimal('balance', { precision: 18, scale: 2 }).notNull(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  createdAt: timestamp('createdAt').notNull(),
  updatedAt: timestamp('updatedAt').notNull(),
});

export const userRelations = relations(user, ({ many }) => ({
  transactions: many(transaction),
  reversals: many(reversal),
}));
