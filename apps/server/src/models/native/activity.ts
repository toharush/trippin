import { Activity } from '../../../../client/src/interfaces';
import ICoordinate from '../../../../client/src/interfaces/activity/coordinate';
import { query } from '../../utils/sqlQuery';

export const getActivitiesInRadiusDB = async (
    radius: number,
    centerPoint: ICoordinate
): Promise<Activity[]> => {
    return (
        await query(
            `SELECT p.*,
            pos.lat, pos.lng,
            google.rate, google.spend, google.image_url,
            category.name as category_name
                FROM trippin."place" p
                JOIN trippin."google" google ON p.id = google.place_id
                JOIN trippin."category" category ON p.category_id = category.id
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
                ) ORDER BY google.rate DESC LIMIT $4;`,
            [
                radius,
                centerPoint.lat,
                centerPoint.lng,
                process.env.MAX_ACTIVITIES_SQL ?? 100,
            ]
        )
    ).rows.map(rawData => ({
        ...rawData,
        position: { lat: rawData.lat, lng: rawData.lng },
        category: {
            id: rawData.category_id,
            name: rawData.category_name,
        },
        google: {
            spend: rawData.spend,
            rate: rawData.rate,
            image_url: rawData.image_url,
        },
    }));
};

export const getActivityByIdDB = async (
    activityId: string
): Promise<Activity> => {
    return (
        await query(
            `SELECT p.*,
            pos.lat, pos.lng,
            google.rate, google.spend, google.image_url,
            category.name as category_name
                FROM trippin."place" p
                JOIN trippin."google" google ON p.id = google.place_id
                JOIN trippin."category" category ON p.category_id = category.id
                JOIN trippin."position" pos ON p.position_id = pos.id
                WHERE p.id = ($1);`,
            [activityId]
        )
    ).rows.map(rawData => ({
        ...rawData,
        position: { lat: rawData.lat, lng: rawData.lng },
        category: {
            id: rawData.category_id,
            name: rawData.category_name,
        },
        google: {
            spend: rawData.spend,
            rate: rawData.rate,
            image_url: rawData.image_url,
        },
    }))[0];
};
