import { schema, TABLES, user } from "../config";

export const create_extra_categories = `
CREATE TABLE IF NOT EXISTS ${schema}.${TABLES.EXTRA_CATEGORIES}
(
    "placeId" text COLLATE pg_catalog."default" NOT NULL,
    "categoryId" integer NOT NULL,
    "primary" boolean NOT NULL,
    CONSTRAINT extra_categories_pkey PRIMARY KEY ("placeId", "categoryId"),
    CONSTRAINT "categoryId" FOREIGN KEY ("categoryId")
        REFERENCES ${schema}.${TABLES.CATEGORY} (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "placeId" FOREIGN KEY ("placeId")
        REFERENCES ${schema}.${TABLES.PLACE} (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS ${schema}.${TABLES.EXTRA_CATEGORIES}
    OWNER to ${user};
`;

export const drop_extra_categories = `DROP TABLE IF EXISTS ${schema}.${TABLES.EXTRA_CATEGORIES}`;