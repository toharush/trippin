import { Activity } from '../../../client/src/interfaces';
import ICoordinate from '../../../client/src/interfaces/activity/coordinate';
import IDailyRoute from '../../../client/src/interfaces/activity/dailyRoute';
import ITrip from '../../../client/src/interfaces/activity/trip';
import { findBestActivities } from '../bestDayRouteAlgo/bestDayRouteAlgo';
import {
    calculateAllTripActivities,
    getAllPotentialActivites,
} from './calculateActivities';
import { filterCoveredActivities } from './filterActivities';
import { findStartAlgoPoint } from './findStartActivity';
import { getRankedActivities } from './rankActivities';

const MIN_ACTIVITIES_PER_DAY = 3;
const MAX_RETRIES_AMOUNT = 10;

export const calculateTrip = async (
    name: string,
    cityCenter: ICoordinate,
    radius: number,
    categoryPriorities: Map<string, number>,
    selectedActivities: Activity[],
    startDate: Date,
    endDate: Date,
    startHour: Date,
    endHour: Date
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
            allTripActivities,
            startHour.getHours(),
            endHour.getHours()
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

const findDailyRoute = async (
    dailyIndex: number,
    date: Date,
    cityCenter: ICoordinate,
    radius: number,
    categoryPriorities: Map<string, number>,
    selectedActivities: Activity[],
    allVacationActivities: Activity[],
    startHour: number,
    endHour: number
): Promise<IDailyRoute> => {
    // Find the start point of simplex
    let startAlgoPoint = findStartAlgoPoint(
        cityCenter,
        radius,
        selectedActivities
    );

    // Get max activities from DB under specific radius
    let potentialActivities = await getAllPotentialActivites(
        startAlgoPoint,
        radius
    );

    // Filter activities which already have been covered
    let finalActivities = filterCoveredActivities(
        potentialActivities,
        allVacationActivities
    );

    let counter = 0;
    let maxNumberOfFinalActivities = 0;
    let maxFinalActivitiesArray: Activity[] = [];

    // In case there weren't any potentialActivities after first randomizing process
    while (
        finalActivities.length < MIN_ACTIVITIES_PER_DAY &&
        counter < MAX_RETRIES_AMOUNT
    ) {
        startAlgoPoint = findStartAlgoPoint(
            cityCenter,
            radius,
            selectedActivities
        );

        potentialActivities = await getAllPotentialActivites(
            startAlgoPoint,
            radius
        );

        finalActivities = filterCoveredActivities(
            potentialActivities,
            allVacationActivities
        );

        if (finalActivities.length > maxNumberOfFinalActivities) {
            maxNumberOfFinalActivities = finalActivities.length;
            maxFinalActivitiesArray = finalActivities;
        }

        counter++;
    }

    // Filter activities that has zero rating in category
    const rankedActivities = getRankedActivities(
        categoryPriorities,
        maxFinalActivitiesArray
    );

    // Call dynamic programming algorithm
    const algoResult = findBestActivities(
        rankedActivities,
        startHour,
        endHour,
        startAlgoPoint,
        date
    );

    return {
        date: date,
        index: dailyIndex,
        activities: algoResult,
        extraActivities: [],
    };
};
