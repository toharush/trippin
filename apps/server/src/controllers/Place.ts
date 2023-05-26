import { getPlacesInRadiusDB } from '../models/native/place';
import ICoordinate from '../../../client/src/interfaces/activity/coordinate';
import Place from '../interfaces/place';

export const getPlacesInRadius = async (
    radius: number,
    centerPoint: ICoordinate
): Promise<Place[]> => {
    return await getPlacesInRadiusDB(radius, centerPoint);
};
