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
    slug: text('slug').notNull(),
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
    views: integer('views').default(0),
    downloads: integer('downloads').default(0),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    updatedAt: timestamp('updatedAt')
        .notNull()
        .$onUpdate(() => new Date()),
})

export const jobs = pgTable('jobs', {
    id: serial('id').primaryKey(),
    orgId: integer('orgId')
        .notNull()
        .references(() => orgs.id, { onDelete: 'cascade' }),
    title: text('title'),
    desc: text('desc'),
    kind: varchar('kind'), // contract, internship, job, training
    location: text('location'),
    obligations: text('obligations'),
    experience: jsonb('experieince'),
    education: jsonb('education'),
    contact: jsonb('contact'),
    attachment: jsonb('attachment'),
    expiry: date('expiry').notNull(),
    status: varchar('status').default('draft'), // draft, published
    views: integer('views').default(0),
})

export const applicants = pgTable('applicants', {
    id: serial('id').primaryKey(),
    jobId: integer('jobId')
        .notNull()
        .references(() => jobs.id, { onDelete: 'cascade' }),
    fullName: varchar('fullName'),
    email: varchar('email').notNull(),
    attachments: jsonb('attachments'),
    meta: jsonb('meta'), // extract CV data via ATS
    label: varchar('label').default('Applied'), // Applied, Shortlisted, Interviewed, Hired.
    createdAt: timestamp('createdAt').notNull().defaultNow(),
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