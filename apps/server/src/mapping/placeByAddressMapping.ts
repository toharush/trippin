import { schema, TABLES } from '../../../../utils';

function getPlaceSQLQuery(countryCode: string, stateName?: string, cityName?: string): string {
    let sqlQuery = `(SELECT id FROM ${schema}.${TABLES.ADDRESS} WHERE country_code='${countryCode}'`;

    if (stateName !== undefined) {
        sqlQuery += ` AND state='${stateName}'`;
    }
    if (cityName !== undefined) {
        sqlQuery += ` AND city='${cityName}'`;
    }

    return sqlQuery + ')';
}

export default getPlaceSQLQuery;