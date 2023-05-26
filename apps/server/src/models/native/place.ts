import ICoordinate from "../../../../client/src/interfaces/activity/coordinate";
import Place from "../../interfaces/place";
import {query} from "../../utils/sql_query";

export const getPlacesInRadiusDB = async (
    radius: number,
    centerPoint: ICoordinate
): Promise<Place[]> => {
    return (await query(`SELECT * 
    FROM trippin."place"
    WHERE position_id IN (
        SELECT id
        FROM trippin."position"
        WHERE (
              6371 * 2 * ASIN(
                SQRT(
                      POWER(SIN((RADIANS(lat) - RADIANS($2)) / 2), 2) +
                      COS(RADIANS($2)) * COS(RADIANS(lat)) *
                      POWER(SIN((RADIANS(lng) - RADIANS($3)) / 2), 2)
                )
              )
        ) <= $1
    );`, [radius, centerPoint.lat, centerPoint.lng])).rows
}
