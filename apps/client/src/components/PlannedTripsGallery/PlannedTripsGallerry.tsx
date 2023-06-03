import { Stack } from "@mui/system";
import PlannedTrip from "../PlannedTrip/PlannedTrip";

interface TripBasicInfo {
    city: string;
    duration: number;
    startDate: Date;
    endDate: Date;
}

interface props {
    trips: TripBasicInfo[];
}

export default function PlannedTripsGallery({trips}: props) {
    return (
        <Stack spacing={{ xs: 1, sm: 1, md: 5 }}>
            <div className="trips-list">
                {trips?.map((trip: TripBasicInfo, index) => (
                    <PlannedTrip {...trip} />
                ))}
            </div>
        </Stack>
    )
                }