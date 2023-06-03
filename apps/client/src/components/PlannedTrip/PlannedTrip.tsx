import { setPic } from "../TripBanner/TripBanner";
import "./PlannedTrip.css";

interface TripBasicInfo {
    city: string;
    duration: number;
    startDate: Date;
    endDate: Date;
}

export default function PlannedTrip(props: TripBasicInfo) {
    return (
        <div className="w-1/3">

                <img
                    src={setPic(props.city)}
                    alt=""
                    className="h-full w-full object-cover rounded-lg"
                    loading="lazy"
                />
        </div>
    );
}