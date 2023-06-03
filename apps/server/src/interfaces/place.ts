import { Activity } from '../../../client/src/interfaces';

type OmittedColumns = 'extra' | 'category' | 'google' | 'address' | 'position';
export default interface Place extends Omit<Activity, OmittedColumns> {
    data_version: StreamPipeOptions;
    created_at: Date;
    updated_at: Date;
    address_id: number;
    category_id: number;
    position_id: number;
}
