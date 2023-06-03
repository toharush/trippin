import { Activity } from '../../../client/src/interfaces';
import ICoordinate from '../../../client/src/interfaces/activity/coordinate';
import IGroup from '../../../client/src/interfaces/activity/group';
import { calculateDistance } from '../controllers/mapCalculation';
import turf from 'turf';
import circle from '@turf/circle';

export const findStartAlgoPoint = (
    cityCenter: ICoordinate,
    radius: number,
    selectedActivities: Activity[],
): ICoordinate => {
    if (selectedActivities.length != 0) {
        return findBestCoverPoint(radius, selectedActivities);
    } else {
        return findFarthestPoint(cityCenter, radius);
    }
};

const findBestCoverPoint = (
    radius: number,
    selectedActivities: Activity[]
): ICoordinate => {
    // Divide all selected activities to groups
    let activitiesGroups: IGroup[] = groupPointsByRadius(
        selectedActivities,
        radius
    );

    // Find the group that has maximum selected activities
    let maxActivities = 0;
    let maxGroupIndex = -1;
    activitiesGroups.map((activity, index) => {
        if (activity.selectedActivities.length > maxActivities) {
            maxActivities = activity.selectedActivities.length;
            maxGroupIndex = index;
        }
    });

    // For this group, find the center point
    return findCenterPoint(activitiesGroups[maxGroupIndex].selectedActivities);
};

const groupPointsByRadius = (
    selectedActivities: Activity[],
    radius: number
): IGroup[] => {
    let groups: IGroup[] = [];

    for (let currentSelectedActivity of selectedActivities) {
        let closestGroup: IGroup | null = null;
        let closestDistance = Infinity;

        for (let group of groups) {
            const distance = calculateDistance(
                group.centerActivity.position,
                currentSelectedActivity.position
            );

            if (distance <= radius && distance < closestDistance) {
                closestGroup = group;
                closestDistance = distance;
            }
        }

        if (closestGroup) {
            closestGroup.selectedActivities.push(currentSelectedActivity);
        } else {
            groups.push({
                centerActivity: currentSelectedActivity,
                selectedActivities: [currentSelectedActivity],
            });
        }
    }

    return groups;
};

const findCenterPoint = (activities: Activity[]): ICoordinate => {
    const location: number[][][] = [[]];

    activities.map(activity => {
        location[0].push([activity.position.lng, activity.position.lat]);
    });
    location[0].push([activities[0].position.lng, activities[0].position.lat]);

    const polygon = turf.polygon(location);
    const randomPoint = turf.random('point', 1, {
        bbox: turf.bbox(polygon),
    });
    const point = randomPoint.features[0].geometry.coordinates;

    return {
        lat: point[1],
        lng: point[0],
    };
};

const findFarthestPoint = (
    cityCenter: ICoordinate,
    radius: number
): ICoordinate => {
    let circle1 = circle(
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                // Note order: longitude, latitude.
                coordinates: [cityCenter.lng, cityCenter.lat],
            },
            properties: {},
        },
        radius
    );

    const randomPoint = turf.random('point', 1, {
        bbox: turf.bbox(circle1),
    });

    const point = randomPoint.features[0].geometry.coordinates;

    return {
        lat: point[1],
        lng: point[0],
    };
};