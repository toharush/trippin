import { schema, TABLES, user } from "../config";

export const create_google = `
CREATE TABLE IF NOT EXISTS ${schema}.${TABLES.GOOGLE}
(
    "place_id" text COLLATE pg_catalog."default" NOT NULL,
    rate double precision,
    spend text COLLATE pg_catalog."default",
    image_url text COLLATE pg_catalog."default",
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    CONSTRAINT gplace_pkey PRIMARY KEY ("place_id"),
    CONSTRAINT "place_id" FOREIGN KEY ("place_id")
        REFERENCES ${schema}.${TABLES.PLACE} (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS ${schema}.${TABLES.GOOGLE}
    OWNER to ${user};
`;

export const drop_google = `DROP TABLE IF EXISTS ${schema}.${TABLES.GOOGLE}`;