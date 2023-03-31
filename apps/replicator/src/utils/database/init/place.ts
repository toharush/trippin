import { schema, TABLES, user } from "../config";

export const create_place = `
CREATE TABLE IF NOT EXISTS ${schema}.${TABLES.PLACE}
(
    id text COLLATE pg_catalog."default" NOT NULL,
    title text COLLATE pg_catalog."default" NOT NULL,
    type text COLLATE pg_catalog."default" NOT NULL,
    open_hours jsonb,
    data_version text COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    "positionId" integer,
    "categoryId" integer,
    "addressId" integer,
    CONSTRAINT place_pkey PRIMARY KEY (id),
    CONSTRAINT "addressId" FOREIGN KEY ("addressId")
        REFERENCES ${schema}.${TABLES.ADDRESS} (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT "categoryId" FOREIGN KEY ("categoryId")
        REFERENCES ${schema}.${TABLES.CATEGORY} (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT "positionId" FOREIGN KEY ("positionId")
        REFERENCES ${schema}.${TABLES.POSITION} (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS ${schema}.${TABLES.PLACE}
    OWNER to ${user};
`;

export const drop_place = `DROP TABLE IF EXISTS ${schema}.${TABLES.PLACE}`;