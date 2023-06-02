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

export const create_comments = `
  CREATE TABLE IF NOT EXISTS ${schema}.${TABLES.COMMENTS}
  (
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT ${increase} START ${start_value} MINVALUE ${min_value} MAXVALUE ${max_value} CACHE ${cache} ),
    user_id text COLLATE pg_catalog."default" NOT NULL,
    place_id text COLLATE pg_catalog."default" NOT NULL,
    text text COLLATE pg_catalog."default" NOT NULL,
    date date NOT NULL,
    CONSTRAINT id PRIMARY KEY (id),
    CONSTRAINT comment FOREIGN KEY (place_id)
        REFERENCES ${schema}.${TABLES.PLACE} (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
  )
  
  TABLESPACE pg_default;
  
  ALTER TABLE IF EXISTS ${schema}.${TABLES.COMMENTS}
      OWNER to ${user};

  GRANT ALL ON TABLE ${schema}.${TABLES.COMMENTS} TO postgres;
  
  GRANT ALL ON TABLE ${schema}.${TABLES.COMMENTS} TO ${user};
  `;

export const drop_comments = `DROP TABLE IF EXISTS ${schema}.${TABLES.COMMENTS}`;
