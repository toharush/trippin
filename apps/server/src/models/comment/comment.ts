import { GraphQLObjectType, GraphQLString } from 'graphql';
import { GraphQLInt } from 'graphql/type';
import { schema, TABLES } from '../../../../../utils';

const Comment = new GraphQLObjectType({
    name: 'comment',
    fields: () => ({
        id: { type: GraphQLInt },
        place_id: { type: GraphQLString },
        user_id: { type: GraphQLString },
        text: { type: GraphQLString },
    }),
    extensions: {
        joinMonster: {
            sqlTable: `${schema}.${TABLES.PLACE}`,
            uniqueKey: 'id',
        },
    },
});

export default Comment;

export const registerNewCommentInDb = (
    userId: string,
    place_id: string,
    text: string,
    date: Date
) => {
    console.log(userId, place_id, text, date);
};
