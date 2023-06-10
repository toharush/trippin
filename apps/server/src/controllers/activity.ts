import { getActivitiesInRadiusDB } from '../models/native/activity';
import ICoordinate from '../../../client/src/interfaces/activity/coordinate';
import { Activity } from '../../../client/src/interfaces';

export const getActivitiesInRadius = async (
    radius: number,
    centerPoint: ICoordinate
): Promise<Activity[]> => {
    return await getActivitiesInRadiusDB(radius, centerPoint);
};
