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

export const create_daily_route_activity = `
CREATE TABLE IF NOT EXISTS ${schema}.${TABLES.DAILY_ROUTE_ACTIVITY}
(
    daily_route_id integer NOT NULL,
    start_time timestamp without time zone NOT NULL,
    end_time timestamp without time zone NOT NULL,
    date timestamp without time zone NOT NULL,
    place_id text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT daily_route_activity_pkey PRIMARY KEY (daily_route_id, place_id),
    CONSTRAINT daily_route_activity_daily_route_id_fkey FOREIGN KEY (daily_route_id)
        REFERENCES ${schema}.${TABLES.DAILY_ROUTE} (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT daily_route_activity_place_id_fkey FOREIGN KEY (place_id)
        REFERENCES ${schema}.${TABLES.PLACE} (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)
      TABLESPACE pg_default;
      
      ALTER TABLE IF EXISTS ${schema}.${TABLES.DAILY_ROUTE_ACTIVITY}
          OWNER to ${user};
      `;

export const drop_daily_route_activity = `DROP TABLE IF EXISTS ${schema}.${TABLES.DAILY_ROUTE_ACTIVITY}`;
