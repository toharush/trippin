import { schema as DBSchema, TABLES } from '../../../../utils';

function getPlaceSQLQuery(countryCode: string, stateName?: string, cityName?: string): string {
    var sqlQuery;

    if(stateName == undefined) {
        if (cityName == undefined) {
            sqlQuery = `(SELECT id FROM ${DBSchema}.${TABLES.ADDRESS} WHERE country_code='${countryCode}')`;
        } else {
            sqlQuery = `(SELECT id FROM ${DBSchema}.${TABLES.ADDRESS} WHERE country_code='${countryCode}' AND city='${cityName}')`;
        }
    } else {
        if (cityName == undefined) {
            sqlQuery = `(SELECT id FROM ${DBSchema}.${TABLES.ADDRESS} WHERE country_code='${countryCode}' AND state='${stateName}')`;
        } else {
            sqlQuery = `(SELECT id FROM ${DBSchema}.${TABLES.ADDRESS} WHERE country_code='${countryCode}' AND state='${stateName}' AND city='${cityName}')`;
        }
    }

    return sqlQuery;
}

export default getPlaceSQLQuery;