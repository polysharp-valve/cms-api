CREATE TABLE "categories" (
	"id" varchar PRIMARY KEY NOT NULL,
	"parent_id" varchar,
	"name" varchar NOT NULL,
	"slug" varchar NOT NULL,
	"title" varchar,
	"description" text,
	"meta_title" varchar,
	"meta_description" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "categories_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE INDEX "categories_slug_index" ON "categories" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "categories_parent_id_index" ON "categories" USING btree ("parent_id");