import { relations } from 'drizzle-orm';
import {
  decimal,
  mysqlTable,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core';
import { user } from './user.schema';
import { reversal } from './reversal.schema';

enum TransactionType {
  Standart = 'standard',
  Reversal = 'reversal',
}

export const transaction = mysqlTable('transaction', {
  id: varchar('id', { length: 36 }).primaryKey().notNull(),
  senderId: varchar('senderId', { length: 36 })
    .references(() => user.id)
    .notNull(),
  receiverId: varchar('receiverId', { length: 36 })
    .references(() => user.id)
    .notNull(),
  type: varchar('type', {
    length: 255,
    enum: [TransactionType.Standart, TransactionType.Reversal],
  }).notNull(),
  amount: decimal('amount', { precision: 6, scale: 2 }).notNull(), // max: 9999.99
  createdAt: timestamp('createdAt').notNull(),
  updatedAt: timestamp('updatedAt').notNull(),
});

export const transactionRelations = relations(transaction, ({ one }) => ({
  user: one(user, {
    fields: [transaction.senderId, transaction.receiverId],
    references: [user.id, user.id],
  }),
  reversal: one(reversal),
}));
