ALTER TABLE "dataset" ADD COLUMN "views" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "dataset" ADD COLUMN "downloads" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "orgs" ADD COLUMN "slug" text NOT NULL;