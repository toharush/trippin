import ICoordinate from '../interfaces/coordinate';
import geo from 'geopoint';

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

