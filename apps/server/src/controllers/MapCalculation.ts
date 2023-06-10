import ICoordinate from '../../../client/src/interfaces/activity/coordinate';
import turf from 'turf';

export const calculateDistance = (
    firstPoint: ICoordinate,
    secPoint: ICoordinate
) =>
    turf.distance(
        {
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'Point',
                coordinates: [firstPoint.lng, firstPoint.lat],
            },
        },
        {
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'Point',
                coordinates: [secPoint.lng, secPoint.lat],
            },
        },
        'kilometers'
    );

export const randomPoint = (bbox: number[]): ICoordinate => {
    const randomPoint = turf.random('point', 1, {
        bbox: bbox,
    });
    const point = randomPoint.features[0].geometry.coordinates;

    return {
        lat: point[1],
        lng: point[0],
    };
};
