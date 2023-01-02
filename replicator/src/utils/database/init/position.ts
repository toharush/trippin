import { schema, TABLES } from "../config";

export const create_position = `
CREATE TABLE IF NOT EXISTS ${schema}.${TABLES.POSITION}
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 999999 CACHE 1 ),
    lat double precision NOT NULL,
    lng double precision NOT NULL,
    CONSTRAINT position_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS ${schema}.${TABLES.POSITION}
    OWNER to ${schema};
`;

export const drop_position = `DROP TABLE IF EXISTS ${schema}.${TABLES.POSITION}`;