import { mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';
import { transaction } from './transaction.schema';
import { relations } from 'drizzle-orm';
import { user } from './user.schema';

export const reversal = mysqlTable('reversal', {
  id: varchar('id', { length: 36 }).primaryKey().notNull(),
  originalTransactionId: varchar('originalTransactionId', {
    length: 36,
  })
    .references(() => transaction.id)
    .unique()
    .notNull(),
  reversalTransactionId: varchar('reversalTransactionId', {
    length: 36,
  })
    .references(() => transaction.id)
    .unique()
    .notNull(),
  requesterId: varchar('requesterId', { length: 36 })
    .references(() => user.id)
    .notNull(),
  reason: varchar('reason', { length: 500 }).notNull(),
  createdAt: timestamp('createdAt').notNull(),
  updatedAt: timestamp('updatedAt').notNull(),
});

export const reversalRelations = relations(reversal, ({ one }) => ({
  originalTransaction: one(transaction, {
    fields: [reversal.originalTransactionId],
    references: [transaction.id],
  }),
  reversalTransaction: one(transaction, {
    fields: [reversal.reversalTransactionId],
    references: [transaction.id],
  }),
  user: one(user, {
    fields: [reversal.requesterId],
    references: [user.id],
  }),
}));
