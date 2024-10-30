import { boolean, date, integer, jsonb, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';


export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    email: text('email').notNull(),
    password: text('password').notNull(),
    name: text('name').notNull(),
    role: varchar('role'), // Users, Clerk
    createdAt: timestamp('createdAt').notNull().defaultNow(),
})

export const orgs = pgTable('orgs', {
    id: serial('id').primaryKey(),
    userId: integer('userId')
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),
    name: text('name').notNull(),
    country: varchar('country'),
    kind: varchar('kind').notNull(),
    bio: text('bio'),
    logo: text('logo'),
    email: varchar('email'),
    website: varchar('website'),
    isClaimed: boolean('isClaimed').default(false),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
})

export const orgInvites = pgTable('orgInvites', {
    id: serial('id').primaryKey(),
    userId: integer('userId')
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),
    orgId: integer('orgId')
        .notNull()
        .references(() => orgs.id, { onDelete: 'cascade' }),
    role: varchar('role').notNull(),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
})

export const notifications = pgTable('notifications', {
    id: serial('id').primaryKey(),
    userId: integer('userId')
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),
    orgId: integer('orgId')
        .notNull()
        .references(() => orgs.id, { onDelete: 'cascade' }),
    kind: varchar('role').notNull(),
    content: text('content'),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
})

export const dataset = pgTable('dataset', {
    id: serial('id').primaryKey(),
    orgId: integer('orgId')
        .notNull()
        .references(() => orgs.id, { onDelete: 'cascade' }),
    title: text('title').notNull(),
    desc: text('desc'),
    sector: varchar('sector').notNull(),
    format: varchar('format'), // pdf, xlsx, kmz, kml, csv, geojson, wp_json
    apiAccess: boolean('apiAccess').default(false),
    meta: jsonb('meta'),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    updatedAt: timestamp('updatedAt')
        .notNull()
        .$onUpdate(() => new Date()),
})

export const data = pgTable('data', {
    id: serial('id').primaryKey(),
    setId: integer('setId')
        .notNull()
        .references(() => dataset.id, { onDelete: 'cascade' }),
    startDate: date('startDate'),
    endDate: date('endDate'),
    meta: jsonb('meta')
})


export const subscriptions = pgTable('subscription', {
    id: serial('id').primaryKey(),
    userId: integer('userId')
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),
    setId: integer('setId')
        .notNull()
        .references(() => dataset.id, { onDelete: 'cascade' }),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
})