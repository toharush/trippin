export interface Address {
    id: number;
    label: string;
    country_code?: string;
    country_name?: string;
    state?: string;
    city?: string;
    district?: string;
    street?: string;
    postal_code?: string;
}
