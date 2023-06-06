import ICoordinate from '../../../client/src/interfaces/activity/coordinate';
import geo from 'geopoint';
import { calculateCityCenterPoint } from '../algorithm/calculateCityCenter';

export const calculateDistance = (
    firstPoint: ICoordinate,
    secPoint: ICoordinate
) => {
    const firstGeoCordinate = new geo(firstPoint.lat, firstPoint.lng, false);
    const secGeoCordinate = new geo(secPoint.lat, secPoint.lng, false);

    return firstGeoCordinate.distanceTo(secGeoCordinate, true);
};

export const getPointsInCircle = (
    points: ICoordinate[],
    radius: number,
    center: ICoordinate
) => points.filter(point => calculateDistance(point, center) <= radius);

export const getCityCenter = (cityCoordinates: ICoordinate[]): ICoordinate => {
    return calculateCityCenterPoint(cityCoordinates);
};
