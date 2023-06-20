import { Activity, ITripActivity } from '../../../client/src/interfaces';
import { differenceBy } from 'lodash';

export const filterCoveredActivities = (
    activities: Activity[],
    coveredActivities: (Activity | ITripActivity)[]
): Activity[] => {
    let newArray = [...coveredActivities];

    return differenceBy(
        activities,
        newArray.map(item => {
            if ('activity' in item) {
                item = item.activity;
            }
            return item;
        }),
        'title'
    );
};
