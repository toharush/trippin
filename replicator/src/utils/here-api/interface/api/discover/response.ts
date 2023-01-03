import { Address, Category, Payment, Position, Reference, foodType, Contact } from '../../../app';

export interface DiscoverResponse {
    title: string;
    id: string;
    resultType: string;
    position: Position;
    ontologyId?: string;
    language?: string;
    address?: Address;
    access?: Position[];
    distance?: number;
    categories?: Category[];
    references?: Reference[];
    foodTypes?: foodType[];
    contacts?: Contact[];
    openingHours?: any[];
    payment?: Payment[];
    chain?: any[];
    data_version?: string;
}
