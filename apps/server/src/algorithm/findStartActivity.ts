import { Activity } from "../../../client/src/interfaces";
import ICoordinate from "../../../client/src/interfaces/activity/coordinate";
import IGroup from "../../../client/src/interfaces/activity/group";
import { calculateDistance } from "../controllers/mapCalculation";

export const findStartSimplexPoint = (
    cityCenter: ICoordinate,
    radius: number,
    selectedActivities: Activity[],
    allVacationActivities: Activity[]
): ICoordinate => {
    if (selectedActivities.length != 0) {
        return findBestCoverPoint(radius, selectedActivities);
    } else {
        return findFarthestPoint(allVacationActivities, cityCenter, radius);
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
    let sumLat = 0;
    let sumLng = 0;
    activities.map(activity => {
        sumLat += activity.position.lat;
        sumLng += activity.position.lng;
    });
    const averageLat = sumLat / activities.length;
    const averageLng = sumLng / activities.length;

    return { lat: averageLat, lng: averageLng };
};

const findFarthestPoint = (
    allTripActivities: Activity[],
    cityCenter: ICoordinate,
    radius: number
): ICoordinate => {
    let farthestDistance = 0;
    let farthestPoint: ICoordinate = cityCenter;

    for (let i = 0; i < 10; i++) {
        const randomPoint = getRandomPointInRadius(cityCenter, radius);
        let minDistance = Infinity;

        allTripActivities.map(currentActivity => {
            const distance = calculateDistance(
                randomPoint,
                currentActivity.position
            );
            if (distance < minDistance) {
                minDistance = distance;
            }
        });

        if (minDistance > farthestDistance) {
            farthestDistance = minDistance;
            farthestPoint = randomPoint;
        }
    }

    return farthestPoint;
};

const getRandomPointInRadius = (
    center: ICoordinate,
    radiusInKm: number
): ICoordinate => {
    const radiusInDegrees = radiusInKm / 111.12; // Approximate number of kilometers in one degree (111.12 km/degree at the equator)
    const randomAngle = Math.random() * 360; // Random angle in degrees
    const offsetX = Math.cos(randomAngle) * radiusInDegrees;
    const offsetY = Math.sin(randomAngle) * radiusInDegrees;
    const randomPoint: ICoordinate = {
        lat: center.lat + offsetX,
        lng: center.lng + offsetY,
    };
    return randomPoint;
};