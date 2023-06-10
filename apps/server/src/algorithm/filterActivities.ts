import { Activity } from '../../../client/src/interfaces';
import { differenceBy } from 'lodash';

export const filterCoveredActivities = (
    activities: Activity[],
    coveredActivities: Activity[]
): Activity[] => differenceBy(activities, coveredActivities, 'id');
