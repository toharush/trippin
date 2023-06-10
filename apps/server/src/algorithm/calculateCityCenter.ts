import ICoordinate from '../../../client/src/interfaces/activity/coordinate';

export const calculateCityCenterPoint = (
    cityCoordinates: ICoordinate[]
): ICoordinate => {
    let sumLatitude = 0;
    let sumLongitude = 0;

    cityCoordinates.map(currentCityCoordinate => {
        sumLatitude += currentCityCoordinate.lat;
        sumLongitude += currentCityCoordinate.lng;
    });

    return {
        lat: sumLatitude / cityCoordinates.length,
        lng: sumLongitude / cityCoordinates.length,
    };
};
