import { Activity } from '../../../client/src/interfaces';
import ICoordinate from '../../../client/src/interfaces/activity/coordinate';
import IDailyRoute from '../../../client/src/interfaces/activity/dailyRoute';
import IGroup from '../../../client/src/interfaces/activity/group';
import ITrip from '../../../client/src/interfaces/activity/trip';
import { getActivitiesInRadius } from '../controllers/activity';
import { calculateDistance } from '../controllers/mapCalculation';
import { dbCategoryToClientCategoryMapping } from '../controllers/mapCategory';

const MIN_ACTIVITIES_PER_DAY = 3;
const ACTIVITY_DEFAULT_RATING = 3;

export const calculateTrip = async (
    name: string,
    cityCenter: ICoordinate,
    radius: number,
    categoryPriorities: Map<string, number>,
    selectedActivities: Activity[],
    startDate: Date,
    endDate: Date
): Promise<ITrip> => {
    let dailyRoutes: IDailyRoute[] = [];

    for (
        let i = 0;
        i <= Math.abs(endDate.getDate() - startDate.getDate());
        i++
    ) {
        let date = new Date(startDate);
        date.setDate(date.getDate() + i);

        let allTripActivities = calculateAllTripActivities(dailyRoutes);

        selectedActivities = filterCoveredActivities(
            selectedActivities,
            allTripActivities
        );

        let currentDailyRoute = await findDailyRoute(
            i + 1,
            date,
            cityCenter,
            radius,
            categoryPriorities,
            selectedActivities,
            allTripActivities
        );
        dailyRoutes.push(currentDailyRoute);
    }

    return {
        id: 1,
        name: name,
        routes: dailyRoutes,
        creationDate: new Date(),
        startDate: startDate,
        endDate: endDate,
        categoryPreferences: categoryPriorities,
    };
};

const calculateAllTripActivities = (dailyRoutes: IDailyRoute[]) => {
    let totalActivities: Activity[] = [];

    dailyRoutes.map(currentDailyRoute => {
        currentDailyRoute.activities.map(currentActivity => {
            totalActivities.push(currentActivity);
        });
    });

    return totalActivities;
};

const findDailyRoute = async (
    dailyIndex: number,
    date: Date,
    cityCenter: ICoordinate,
    radius: number,
    categoryPriorities: Map<string, number>,
    selectedActivities: Activity[],
    allVacationActivities: Activity[]
): Promise<IDailyRoute> => {    
    // Find the start point of simplex
    let startSimplexPoint = findStartSimplexPoint(
        cityCenter,
        radius,
        selectedActivities,
        allVacationActivities
    );

    // Get max activities from DB under specific radius
    let potentialActivities = await getAllPotentialActivites(
        startSimplexPoint,
        radius
    );

    // In case there weren't any potentialActivities after first randomizing
    while (potentialActivities.length < MIN_ACTIVITIES_PER_DAY)  {
        startSimplexPoint = findStartSimplexPoint(
            cityCenter,
            radius,
            selectedActivities,
            allVacationActivities
        );

        potentialActivities = await getAllPotentialActivites(
            startSimplexPoint,
            radius
        );
    }

    // Filter activities that has zero rating in category
    const rankedActivities = getRankedActivities(
        categoryPriorities,
        potentialActivities
    );
    console.log(JSON.stringify(rankedActivities, null, 8));

    // Filter activities which already have been covered
    const finalActivities = filterCoveredActivities(
        rankedActivities,
        allVacationActivities
    );

    // Simplex algo

    // After running simplex algorithm we need to take the daily route activities that simplex 
    // has returned and concat them to allVacationActivities array

    return {
        date: date,
        index: dailyIndex,
        activities: finalActivities,
        extraActivities: [],
    };
};

const filterCoveredActivities = (
    activities: Activity[],
    coveredActivities: Activity[]
): Activity[] =>
    activities.filter(
        currentActivity =>
            !isActivityCovered(currentActivity, coveredActivities)
    );

const isActivityCovered = (
    activity: Activity,
    activities: Activity[]
): boolean => Boolean(activities.length > 0 && activities.filter(currentActivity => currentActivity.id === activity.id));

const getRankedActivities = (
    categoryPriorities: Map<string, number>,
    potentialActivities: Activity[]
): Activity[] =>
    potentialActivities.map(currentActivity => {
        currentActivity.rate = calculateActivityGrade(
            currentActivity,
            categoryPriorities
        );
        return currentActivity;
    });

const calculateActivityGrade = (
    activity: Activity,
    categoryPriorities: Map<string, number>
): number => {
    let clientCategory = dbCategoryToClientCategoryMapping(activity.category);
    const categoryPreference: number | undefined = categoryPriorities.get(clientCategory);

    if (!categoryPreference) {
        return 0;
    } else {
        if (activity.google?.rate) {
            return categoryPreference * parseInt(activity.google.rate);
        } else {
            return categoryPreference * ACTIVITY_DEFAULT_RATING;
        }
    }
};

const getAllPotentialActivites = async (
    startPoint: ICoordinate,
    radius: number
): Promise<Activity[]> => await getActivitiesInRadius(radius, startPoint);

const findStartSimplexPoint = (
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
