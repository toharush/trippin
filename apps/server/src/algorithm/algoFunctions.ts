import { Activity } from '../../../client/src/interfaces';
import ICoordinate from '../../../client/src/interfaces/activity/coordinate';
import IDailyRoute from '../../../client/src/interfaces/activity/dailyRoute';
import IGroup from '../../../client/src/interfaces/activity/group';
import ITrip from '../../../client/src/interfaces/activity/trip';
import { getActivitiesInRadius } from '../controllers/activity';
import { calculateDistance } from '../controllers/mapCalculation';

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
        i < Math.abs(endDate.getDate() - startDate.getDate());
        i++
    ) {
        let date = startDate;
        date.setDate(startDate.getDate() + i);
        const allTripActivities = calculateAllTripActivities(dailyRoutes);
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
    const startSimplexPoint = findStartSimplexPoint(
        cityCenter,
        radius,
        selectedActivities
    );

    // Get max activities from DB under specific radius
    const potentialActivities = await getAllPotentialActivites(
        startSimplexPoint,
        radius
    );

    // Filter activities that has zero rating in category
    const rankedActivities = getRankedActivities(
        categoryPriorities,
        potentialActivities
    );

    // Filter activities which already have been covered
    const finalActivities = filterCoveredActivities(
        rankedActivities,
        allVacationActivities
    );

    // Simplex algo

    return {
        date: date,
        index: dailyIndex,
        activities: finalActivities,
        extraActivities: [],
    };
};

export const filterCoveredActivities = (
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
): boolean => activities.includes(activity);

export const getRankedActivities = (
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
    const activityDefaultRating: number = 3;
    const categoryPreference: number | undefined = categoryPriorities.get(
        activity.category
    );

    if (!categoryPreference) {
        return 0;
    } else {
        if (activity.google.rate === undefined) {
            return categoryPreference * activityDefaultRating;
        } else {
            return categoryPreference * parseInt(activity.google.rate);
        }
    }
};

export const getAllPotentialActivites = async (
    startPoint: ICoordinate,
    radius: number
): Promise<Activity[]> => await getActivitiesInRadius(radius, startPoint);

export const findStartSimplexPoint = (
    cityCenter: ICoordinate,
    radius: number,
    selectedActivities: Activity[]
): ICoordinate => {
    if (selectedActivities.length != 0) {
        return findBestCoverPoint(radius, selectedActivities);
    } else {
        // Need Implementation
        return findRandomPointInRadius(cityCenter, radius);
    }
};

const findRandomPointInRadius = (
    cityCenter: ICoordinate,
    radius: number
): ICoordinate => {
    return { lat: 8, lng: 8 };
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
    const groups: IGroup[] = [];

    for (const currentSelectedActivity of selectedActivities) {
        let closestGroup: IGroup | null = null;
        let closestDistance = Infinity;

        for (const group of groups) {
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
