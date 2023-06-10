import logger from "../logger/logger";
import client from "./client";
import { schema } from "./config";
import { create_address } from "./init/address";
import { create_category } from "./init/category";
import { create_comments } from "./init/comment";
import { create_extra_categories } from "./init/extra_categoris";
import { create_google } from "./init/google";
import { create_place } from "./init/place";
import { create_position } from "./init/position";

const create_schema = `CREATE SCHEMA IF NOT EXISTS ${schema}`;
const drop_schema = `DROP SCHEMA ${schema} CASCADE;`;

export const init_database = async () => {
  try {
    await client.query(create_schema);
    await client.query(create_category);
    await client.query(create_position);
    await client.query(create_address);
    await client.query(create_place);
    await client.query(create_extra_categories);
    await client.query(create_google);
    await client.query(create_comments);
  } catch (err) {
    logger.error("failed to init database");
    logger.error(err);
  }
};

export const drop_database = async () => {
  await client.query(drop_schema);
};
