import { Activity } from '../../../../client/src/interfaces';
import ICoordinate from '../../../../client/src/interfaces/activity/coordinate';
import { query } from '../../utils/sql_query';

export const getActivitiesInRadiusDB = async (
    radius: number,
    centerPoint: ICoordinate
): Promise<Activity[]> => {
    return (
        await query(
            `SELECT p.*, pos.lat, pos.lng
    FROM trippin."place" p
    JOIN trippin."position" pos ON p.position_id = pos.id
    WHERE position_id IN (
          SELECT id
        FROM trippin."position"
        WHERE (
            6371 * 2 * ASIN(
                SQRT(
                      POWER(SIN((RADIANS(pos.lat) - RADIANS($2)) / 2), 2) +
                      COS(RADIANS($2)) * COS(RADIANS(pos.lat)) *
                      POWER(SIN((RADIANS(pos.lng) - RADIANS($3)) / 2), 2)
                )
              )
        ) <= $1
    );`,
            [radius, centerPoint.lat, centerPoint.lng]
        )
    ).rows.map(rawData => ({
        ...rawData,
        position: { lat: rawData.lat, lng: rawData.lng },
    }));
};
