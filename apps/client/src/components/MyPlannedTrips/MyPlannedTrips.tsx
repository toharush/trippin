import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import IconButton from '@mui/material/IconButton';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ITrip from '../../interfaces/activity/trip';

interface Props {
    realTrips: ITrip[];
}

export default function MyPlannedTrips() {

    const formatTripDisplayName = (destination: string, days: number): string =>
        (`${days} days in ${destination}`);

    const calculateDays = (startDate: Date, endDate: Date): number =>
        Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

    const orderByCreationDate = (trips: PlannedTrip[]): PlannedTrip[] => {
        return trips.sort((a, b) => {
            if (a.creationDate && b.creationDate) {
                return b.creationDate.getTime() - a.creationDate.getTime();
            }
            return 0;
        });
    };

    const mapTripsToPlannedTrips = (trips: Partial<ITrip>[]): PlannedTrip[] => {
        return trips.map((trip) => {
            let days = calculateDays(trip.startDate!, trip.endDate!);
            let displayName = formatTripDisplayName(trip.name!, days);
            return {
                id: trip.id!,
                name: trip.name!,
                creationDate: trip.creationDate!,
                startDate: trip.startDate!,
                endDate: trip.endDate!,
                displayName: displayName
            }
        }
        )
    };


    const mappedTripsWithDisplayName = mapTripsToPlannedTrips(trips);
    const orderedTrips = orderByCreationDate(mappedTripsWithDisplayName);

    return (
        <ImageList sx={{ cols:2, gap:2 }}>
            {orderedTrips.map((trip: PlannedTrip) => (
                <ImageListItem key={trip.id}>
                    <img
                        src={`${trip.name.toLowerCase()}.png?w=30&h=45&fit=crop&auto=format`}
                        srcSet={`${trip.name.toLocaleLowerCase}.png?w=45&h=45&fit=crop&auto=format&dpr=2 2x`}
                        // alt={trip.title}
                        loading="lazy"
                    />
                    <ImageListItemBar
                        sx={{
                            background:
                                'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                                'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                        }}
                        title={trip.displayName}
                        position="top"
                        actionIcon={
                            <IconButton
                                sx={{ color: 'white' }}
                                aria-label={`delete ${trip.name}`}
                                onClick={() => {
                                    //deleteTrip
                                 }}
                            >
                                <DeleteOutlineIcon />
                            </IconButton>
                        }
                        actionPosition="right"
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );
}

export interface PlannedTrip {
    id: number,
    name: string,
    creationDate: Date,
    startDate: Date,
    endDate: Date,
    displayName: string
}

const trips: Partial<ITrip>[] = [
    {
        id: 1,
        name: "London",
        creationDate: new Date(),
        startDate: new Date("2023-10-10"),
        endDate: new Date("2023-10-20"),
        // destination: "London",
    },
    {
        id: 2,
        name: "Leeds",
        creationDate: new Date(),
        startDate: new Date("2023-08-18"),
        endDate: new Date("2023-08-23"),
        // destination: "Leeds",
    },
    {
        id: 1,
        name: "Manchester",
        creationDate: new Date(),
        startDate: new Date("2023-11-04"),
        endDate: new Date("2023-11-16"),
        // destination: "Manchester",
    },
    {
        id: 1,
        name: "Liverpool",
        creationDate: new Date(),
        startDate: new Date("2023-11-21"),
        endDate: new Date("2023-12-15"),
        // destination: "Liverpool",
    },
    {
        id: 1,
        name: "Glasgow",
        creationDate: new Date(),
        startDate: new Date("2023-07-09"),
        endDate: new Date("2023-07-13"),
        // destination: "Glasgow",
    }];