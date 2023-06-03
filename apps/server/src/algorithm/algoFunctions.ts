import { Activity } from '../../../client/src/interfaces';
import ICoordinate from '../../../client/src/interfaces/activity/coordinate';
import IDailyRoute from '../../../client/src/interfaces/activity/dailyRoute';
import ITrip from '../../../client/src/interfaces/activity/trip';
import { calculateAllTripActivities, getAllPotentialActivites } from './calculateActivities';
import { filterCoveredActivities } from './filterActivities';
import { findStartSimplexPoint } from './findStartActivity';
import { getRankedActivities } from './rankActivities';

const MIN_ACTIVITIES_PER_DAY = 3;

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
