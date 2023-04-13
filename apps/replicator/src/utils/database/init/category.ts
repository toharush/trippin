import {
  cache,
  increase,
  max_value,
  min_value,
  start_value,
  schema,
  TABLES,
  user,
} from "../config";

export const create_category = `
CREATE TABLE IF NOT EXISTS ${schema}.${TABLES.CATEGORY}
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT ${increase} START ${start_value} MINVALUE ${min_value} MAXVALUE ${max_value} CACHE ${cache} ),
    name text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT category_pkey PRIMARY KEY (id),
    CONSTRAINT category_name_unique UNIQUE (name)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS ${schema}.${TABLES.CATEGORY}
    OWNER to ${user};
`;

export const drop_category = `DROP TABLE IF EXISTS ${schema}.${TABLES.CATEGORY}`;
