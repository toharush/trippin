import { getAllPositions } from "../controllers/position";

export const getRandomLocation = async () => {
  const location = await getRandomCoordinateNotInList();

  return `${location.lat},${location.lng}`;
};

const generateRandomCoordinate = () => {
  const min = -90;
  const max = 90;
  const randomLatitude = Math.random() * (max - min) + min;
  const randomLongitude = Math.random() * (max - min) + min;
  return { lat: randomLatitude, lng: randomLongitude };
};

const getRandomCoordinateNotInList = async () => {
  const existingCoordinates = await getAllPositions();
  let randomCoordinate = await generateRandomCoordinate();
  while (
    await existingCoordinates.some(
      (coord) =>
        coord.lat === randomCoordinate.lat && coord.lng === randomCoordinate.lng
    )
  ) {
    randomCoordinate = await generateRandomCoordinate();
  }
  return randomCoordinate;
};
