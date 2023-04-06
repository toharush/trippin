import { cache, increase, max_value, min_value, schema, start_value, TABLES, user } from "../config";

export const create_address = `
CREATE TABLE IF NOT EXISTS ${schema}.${TABLES.ADDRESS}
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT ${increase} START ${start_value} MINVALUE ${min_value} MAXVALUE ${max_value} CACHE ${cache} ),
    label text COLLATE pg_catalog."default",
    "countryCode" text COLLATE pg_catalog."default",
    "countryName" text COLLATE pg_catalog."default",
    state text COLLATE pg_catalog."default",
    city text COLLATE pg_catalog."default",
    district text COLLATE pg_catalog."default",
    street text COLLATE pg_catalog."default",
    "postalCode" text COLLATE pg_catalog."default",
    CONSTRAINT address_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS ${schema}.${TABLES.ADDRESS}
    OWNER to ${user};
`;

export const drop_address = `DROP TABLE IF EXISTS ${schema}.${TABLES.ADDRESS}`;