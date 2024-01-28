import { pgEnum, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';

export const priorityEnum = pgEnum('priority', ['low', 'medium', 'high']);

export const status = pgEnum('status', ['todo', 'completed']);

export const todo = pgTable('todo', {
  id: serial('id').primaryKey(),
  updatedAt: timestamp('updated_at').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  title: text('title').notNull(),
  priority: priorityEnum('priority').notNull().default('low'),
  status: status('status').notNull().default('todo'),
});

export const todoInsertSchema = createInsertSchema(todo).omit({
  updatedAt: true,
  createdAt: true,
});
