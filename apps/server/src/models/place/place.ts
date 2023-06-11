import { GraphQLObjectType, GraphQLString } from "graphql";
import {
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLList,
} from "graphql/type";
import { schema, TABLES } from "../../../../../utils";
import address from "../address/address";
import category, { CategoryInput } from "../category/category";
import extraCategories from "../category/extraCategories";
import google, { GoogleInput } from "../google/google";
import position from "../position/position";
import Icoordinate from "../Icoordinate/icoordinate";

const Place = new GraphQLObjectType({
  name: "place",
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    type: { type: GraphQLString },
    close_hour: { type: GraphQLFloat },
    open_hour: { type: GraphQLFloat },
    extra: {
      type: extraCategories,
      extensions: {
        joinMonster: {
          ignoreAll: false,
          sqlBatch: {
            thisKey: "place_id",
            parentKey: "id",
          },
        },
      },
    },
    category: {
      type: category,
      extensions: {
        joinMonster: {
          ignoreAll: false,
          sqlBatch: {
            thisKey: "id",
            parentKey: "category_id",
          },
        },
      },
    },
    google: {
      type: google,
      extensions: {
        joinMonster: {
          ignoreAll: false,
          sqlBatch: {
            thisKey: "place_id",
            parentKey: "id",
          },
        },
      },
    },
    address: {
      type: address,
      extensions: {
        joinMonster: {
          ignoreAll: false,
          sqlBatch: {
            thisKey: "id",
            parentKey: "address_id",
          },
        },
      },
    },
    position: {
      type: position,
      extensions: {
        joinMonster: {
          ignoreAll: false,
          sqlBatch: {
            thisKey: "id",
            parentKey: "position_id",
          },
        },
      },
    },
  }),
  extensions: {
    joinMonster: {
      sqlTable: `${schema}.${TABLES.PLACE}`,
      uniqueKey: "id",
    },
  },
});

export default Place;

export const InputPlace = new GraphQLInputObjectType({
  name: "inputPlace",
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    type: { type: GraphQLString },
    category: {
      type: CategoryInput,
    },
    google: {
      type: GoogleInput,
    },
    position: {
      type: Icoordinate,
    },
  }),
});
