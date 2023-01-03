export interface Place {
    id: string;
    title: string;
    type: string;
    open_hours?: any;
    data_version: string;
    updated_at: Date;
    position_id?: number;
    category_id?: number;
    address_id?: number;
}