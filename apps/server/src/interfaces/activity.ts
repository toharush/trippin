export interface Activity {
    id: string;
    type: number;
    name: string;
    location: [number,number];
    openHour: number;
    closeHour: number;
    userRate: number;
    duration: number;
}