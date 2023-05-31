import { GraphQLObjectType, GraphQLString } from 'graphql';
import { GraphQLInt } from 'graphql/type';
import { schema, TABLES } from '../../../../../utils';
import client from '../../utils/dbClient';

const Comment = new GraphQLObjectType({
    name: 'comment',
    fields: () => ({
        id: { type: GraphQLInt },
        place_id: { type: GraphQLString },
        user_id: { type: GraphQLString },
        text: { type: GraphQLString },
        date: { type: GraphQLString },
    }),
    extensions: {
        joinMonster: {
            sqlTable: `${schema}.${TABLES.COMMENTS}`,
            uniqueKey: 'id',
        },
    },
});

export default Comment;

export const registerNewCommentInDb = async (
    userId: string,
    place_id: string,
    text: string,
    date: Date
) => {
    const q = `INSERT INTO trippin.comment(user_id, place_id, text, date) VALUES ($1, $2, $3, $4);`;
    return await client.query(q, [userId, place_id, text, date]);
};
