import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import IconButton from '@mui/material/IconButton';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ITrip from '../../interfaces/activity/trip';
import { useTrip } from '../../hooks';
import './MyPlannedTrips.css';
import CityImagesResourceService from './CityImagesResourceService';
import { useEffect, useState } from 'react';
import { setSelectedTrip } from '../../store/slices/trip';


export default function MyPlannedTrips() {

    const { trips, SetSelectedTrip, ResetSelectedTrip, deleteTripById } = useTrip();
    const [mappedTripsWithDisplayName, setMappedTripsWithDisplayName] = useState<PlannedTrip[]>([]);
    const [orderedTrips, setOrderedTrips] = useState<PlannedTrip[]>([]);

    const formatTripDisplayName = (destination: string, days: number): string =>
        (`${days} Days In ${destination}`);

    const calculateDaysInclusive = (startDate: Date, endDate: Date): number => {
        const start = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
        const end = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
        const millisecondsPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
      
        const days = Math.round(Math.abs((end.getTime() - start.getTime()) / millisecondsPerDay)) + 1;
        return days;
      };

    const orderByCreationDate = (trips: PlannedTrip[]): PlannedTrip[] => {
        return trips?.sort((a, b) => {
            if (a.creation_date && b.creation_date) {
                return new Date(b.creation_date).getTime() - new Date(a.creation_date).getTime();
            }
            return 0;
        });
    };

    const mapTripsToPlannedTrips = async (trips: ITrip[] | null): Promise<PlannedTrip[]> => {
        if (!trips) return [];

        const plannedTrips: PlannedTrip[] = [];

        for (const trip of trips) {
            const days = calculateDaysInclusive(new Date(trip.start_date), new Date(trip.end_date));
            const displayName = formatTripDisplayName(trip.name!, days);
            const image = await fetchCityImage(trip.name!); // Fetch the city image

            const plannedTrip: PlannedTrip = {
                ...trip,
                displayName: displayName,
                image: image, // Include the image URL in the trip object
            };

            plannedTrips.push(plannedTrip);
        }

        return plannedTrips;
    };

    const fetchCityImage = async (city: string) => {
        try {
            const response = await CityImagesResourceService.getCityImages(city);
            const image = response?.results[0]?.urls?.regular;
            return image || '/cities/default.png'; // Return the image URL or an empty string if not found
        } catch (error) {
            console.error('Error fetching city image:', error);
            return '/cities/default.png'; // Return an empty string on error
        }
    };

    useEffect(() => {
        (async () => {
            const mappedTrips = await mapTripsToPlannedTrips(trips);
            setMappedTripsWithDisplayName(mappedTrips);
        })();
    }, [trips]);

    useEffect(() => {
        (async () => {
            const orderedTrips = orderByCreationDate(mappedTripsWithDisplayName);
            setOrderedTrips(orderedTrips);
            setSelectedTrip(orderedTrips[0]);
        })();
    }, [mappedTripsWithDisplayName]);

    return (
        <div className="my-planned-trips">
            <div className="my-planned-trips-header">
                My Planned Trips
            </div>
            <ImageList sx={{ maxHeight: '70vh' }} cols={2} gap={10} rowHeight={'auto'}>
                {orderedTrips.map((trip: PlannedTrip) => (
                    <ImageListItem key={trip.id}>
                        <img
                            src={trip.image}
                            alt={trip.name}
                            loading="lazy"
                            style={{ objectFit: 'cover', width: '15vw', height: 'auto', aspectRatio: '1/1', borderRadius: '10px' }}
                            onClick={() => {
                                SetSelectedTrip(trip);
                            }}
                        />
                        <ImageListItemBar
                            sx={{
                                borderRadius: '10px',
                                background:
                                    'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                                    'rgba(0,0,0,0.5) 70%, rgba(0,0,0,0) 100%)',
                                fontSize: '1.5rem',
                                width: '15vw',
                            }}
                            title={<span className="image-list-item-bar-title">{trip.displayName}</span>}
                            position="top"
                            actionIcon={
                                <IconButton
                                    sx={{ color: 'white' }}
                                    aria-label={`delete ${trip.name}`}
                                    onClick={() => {
                                        deleteTripById(trip.id)
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
        </div>

    );
}

export interface PlannedTrip extends ITrip {
    displayName: string,
    image: string
}