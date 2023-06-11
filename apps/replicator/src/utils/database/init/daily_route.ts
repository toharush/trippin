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

export const create_daily_route = `
CREATE TABLE IF NOT EXISTS ${schema}.${TABLES.DAILY_ROUTE}
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT ${increase} START ${start_value} MINVALUE ${min_value} MAXVALUE ${max_value} CACHE ${cache} ),
    trip_id integer NOT NULL,
    date timestamp without time zone NOT NULL,
    index integer NOT NULL,
    CONSTRAINT daily_route_pkey PRIMARY KEY (id),
    CONSTRAINT trip_id FOREIGN KEY (trip_id)
        REFERENCES ${schema}.${TABLES.TRIP} (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)
    
    TABLESPACE pg_default;
    
    ALTER TABLE IF EXISTS ${schema}.${TABLES.DAILY_ROUTE}
        OWNER to ${user};
    `;

export const drop_daily_route = `DROP TABLE IF EXISTS ${schema}.${TABLES.DAILY_ROUTE}`;
