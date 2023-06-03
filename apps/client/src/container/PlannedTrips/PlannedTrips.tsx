import PlannedTripsGallery from "../../components/PlannedTripsGallery/PlannedTripsGallerry";
import SideBar from "../../components/SideBar/SideBar";
import TripBanner from "../../components/TripBanner/TripBanner";

interface TripBasicInfo {
    city: string;
    duration: number;
    startDate: Date;
    endDate: Date;
}

// const trip: TripBasicInfo = {
//     city: "london",
//     duration: 12,
//     startDate: new Date("2023-1-1"),
//     endDate: new Date("2023-1-11")
// }

const trips: TripBasicInfo[] = [
    {
    city: "london",
        duration: 12,
            startDate: new Date("2023-1-1"),
                endDate: new Date("2023-1-11")
    },
];

const PlannedTrips = () => {
    return (
        <>
            <SideBar />
            <TripBanner {...trips[0]}/>
            <PlannedTripsGallery trips={trips}/>
        </>
    );
};

export default PlannedTrips;