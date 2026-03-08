import { uuid , pgTable, timestamp, varchar, text,boolean } from "drizzle-orm/pg-core";


export const users = pgTable('users',{
    id: uuid('id').primaryKey().defaultRandom().notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
    email: varchar("email", { length: 256 }).unique().notNull(),
    hashed_password: varchar("hashed_password",{length: 256}).notNull().default('unset'),
    isChirpyRed: boolean('isChirpyRed').default(false).notNull()

});

export type NewUser = typeof users.$inferInsert;
export type saveUser = Omit<NewUser,"hashed_password">;

export const chirps = pgTable('chirps',{
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
    body: varchar('body',{length: 140}).notNull(),
    user_id: uuid('user_id').references(() => users.id, {onDelete: 'cascade'}).notNull(),

});
export type NewChirp = typeof chirps.$inferInsert;


export const refresh_tokens = pgTable('refresh_tokens',{
    token: text('id').primaryKey().notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
    user_id: uuid('user_id').references(() => users.id, { onDelete: 'cascade'}).notNull().unique(),
    expires_at: timestamp("expires_at").notNull(),
    revoked_at: timestamp("revoked_at"),

})

export type NewRefreshToken = typeof refresh_tokens.$inferInsert;


