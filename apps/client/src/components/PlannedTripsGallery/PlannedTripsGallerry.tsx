import { Stack } from "@mui/system";
import { Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
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
        <>
        <Stack spacing={{ xs: 1, sm: 1, md: 5 }}>
            <div className="trips-list">
                {trips?.map((trip: TripBasicInfo, index) => (
                    <PlannedTrip {...trip} />
                ))}
            </div>
        </Stack>
        <Button
            className="icon-button next"
            // onClick={setIsPlannedTripOpen(false)}
            endIcon={<ArrowBackIosIcon />}>
        </Button>
        </>
    )
                }