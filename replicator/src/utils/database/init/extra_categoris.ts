import { schema, TABLES } from "../config";

export const create_extra_categories = `
CREATE TABLE IF NOT EXISTS ${schema}.${TABLES.EXTRA_CATEGORIES}
(
    "place_id" text COLLATE pg_catalog."default" NOT NULL,
    "category_id" integer NOT NULL,
    "is_primary" boolean NOT NULL,
    CONSTRAINT extra_categories_pkey PRIMARY KEY ("place_id", "category_id"),
    CONSTRAINT "category_id" FOREIGN KEY ("category_id")
        REFERENCES ${schema}.${TABLES.CATEGORY} (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "place_id" FOREIGN KEY ("place_id")
        REFERENCES ${schema}.${TABLES.PLACE} (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS ${schema}.${TABLES.EXTRA_CATEGORIES}
    OWNER to ${schema};
`;

export const drop_extra_categories = `DROP TABLE IF EXISTS ${schema}.${TABLES.EXTRA_CATEGORIES}`;