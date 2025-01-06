CREATE TYPE "public"."media_type" AS ENUM('image', 'video', 'pdf');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('draft', 'published', 'archived');--> statement-breakpoint
CREATE TABLE "media_folder" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "media_folder_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "media" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"type" "media_type" NOT NULL,
	"src" varchar NOT NULL,
	"alt" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "media_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "meta" (
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"description" varchar NOT NULL,
	"media_id" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "meta_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "product_category" (
	"id" varchar PRIMARY KEY NOT NULL,
	"parent_id" varchar,
	"name" varchar NOT NULL,
	"slug" varchar NOT NULL,
	"title" varchar NOT NULL,
	"description" text,
	"meta_id" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "product_category_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "product_collection" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"slug" varchar NOT NULL,
	"title" varchar NOT NULL,
	"description" text,
	"meta_id" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "product_collection_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "product_option_value" (
	"id" varchar PRIMARY KEY NOT NULL,
	"value" varchar NOT NULL,
	"product_option_id" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "product_option_value_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "product_option" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"product_id" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "product_option_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "product_tag" (
	"id" varchar PRIMARY KEY NOT NULL,
	"value" varchar NOT NULL,
	"display_value" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "product_tag_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "product_type" (
	"id" varchar PRIMARY KEY NOT NULL,
	"value" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "product_type_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "product_variant" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"slug" varchar NOT NULL,
	"sku" varchar NOT NULL,
	"barcode" varchar NOT NULL,
	"product_id" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "product_variant_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "product_variants_option_values" (
	"product_variant_id" varchar,
	"product_option_value_id" varchar
);
--> statement-breakpoint
CREATE TABLE "product" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"slug" varchar NOT NULL,
	"meta_id" varchar,
	"product_type_id" varchar,
	"draft" "status" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "product_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "products_categories" (
	"product_category_id" varchar,
	"product_id" varchar
);
--> statement-breakpoint
CREATE TABLE "products_collections" (
	"product_collection_id" varchar,
	"product_id" varchar
);
--> statement-breakpoint
ALTER TABLE "meta" ADD CONSTRAINT "meta_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_category" ADD CONSTRAINT "product_category_meta_id_meta_id_fk" FOREIGN KEY ("meta_id") REFERENCES "public"."meta"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_collection" ADD CONSTRAINT "product_collection_meta_id_meta_id_fk" FOREIGN KEY ("meta_id") REFERENCES "public"."meta"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_option_value" ADD CONSTRAINT "product_option_value_product_option_id_product_option_id_fk" FOREIGN KEY ("product_option_id") REFERENCES "public"."product_option"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_option" ADD CONSTRAINT "product_option_product_id_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."product"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_variant" ADD CONSTRAINT "product_variant_product_id_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."product"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_variants_option_values" ADD CONSTRAINT "product_variants_option_values_product_variant_id_product_variant_id_fk" FOREIGN KEY ("product_variant_id") REFERENCES "public"."product_variant"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_variants_option_values" ADD CONSTRAINT "product_variants_option_values_product_option_value_id_product_option_value_id_fk" FOREIGN KEY ("product_option_value_id") REFERENCES "public"."product_option_value"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product" ADD CONSTRAINT "product_meta_id_meta_id_fk" FOREIGN KEY ("meta_id") REFERENCES "public"."meta"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product" ADD CONSTRAINT "product_product_type_id_product_type_id_fk" FOREIGN KEY ("product_type_id") REFERENCES "public"."product_type"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products_categories" ADD CONSTRAINT "products_categories_product_category_id_product_category_id_fk" FOREIGN KEY ("product_category_id") REFERENCES "public"."product_category"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products_categories" ADD CONSTRAINT "products_categories_product_id_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."product"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products_collections" ADD CONSTRAINT "products_collections_product_collection_id_product_collection_id_fk" FOREIGN KEY ("product_collection_id") REFERENCES "public"."product_collection"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products_collections" ADD CONSTRAINT "products_collections_product_id_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."product"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "product_category_slug_index" ON "product_category" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "product_category_parent_id_index" ON "product_category" USING btree ("parent_id");