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

export const create_trip = `
  CREATE TABLE IF NOT EXISTS ${schema}.${TABLES.TRIP}
  (
      id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT ${increase} START ${start_value} MINVALUE ${min_value} MAXVALUE ${max_value} CACHE ${cache} ),
      name text COLLATE pg_catalog."default" NOT NULL,
      creation_date timestamp without time zone NOT NULL,
      start_date timestamp without time zone NOT NULL,
      end_date timestamp without time zone NOT NULL,
      user_id text COLLATE pg_catalog."default" NOT NULL,
      CONSTRAINT trip_pkey PRIMARY KEY (id)
  )
  
  TABLESPACE pg_default;
  
  ALTER TABLE IF EXISTS ${schema}.${TABLES.TRIP}
      OWNER to ${user};
  `;

export const drop_trip = `DROP TABLE IF EXISTS ${schema}.${TABLES.TRIP}`;
