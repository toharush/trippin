import { getAllPositions } from "../controllers/position";
import { GOOGLE_IMG_SCRAP } from "google-img-scrap";
import turf from "turf";
import { randomPoint } from "../../../server/src/controllers/mapCalc";
import { convertDBCategoryToClientCategory } from "../../../server/src/controllers/mapCategory";
import { clientCategories } from "../../../server/src/enums/clientCategory";
export const getRandomLocation = async () => {
  const location = await getRandomCoordinateNotInList();

  return `${location.lat},${location.lng}`;
};

export const getGoogleImage = async (label: string) => {
  const defaultImage =
    "https://th.bing.com/th/id/OIP.FjGCo53E5pd2s23Zs1TV_gHaE6?pid=ImgDet&rs=1";
  try {
    const res = await GOOGLE_IMG_SCRAP({
      search: label,
    });

    if (res && res.result.length > 0) {
      res.result?.map((item) => !item?.url?.includes("fbsbx"));
      return res.result[0]?.url ?? defaultImage;
    }
  } catch (err) {
    console.log(err);
  }
  return defaultImage;
};

const getRandomCoordinateNotInList = async () => {
  const existingCoordinates = await getAllPositions();
  let randomCoordinate = await getTurfLocation();
  while (
    await existingCoordinates.some(
      (coord) =>
        coord.lat === randomCoordinate.lat && coord.lng === randomCoordinate.lng
    )
  ) {
    randomCoordinate = await getTurfLocation();
  }
  return randomCoordinate;
};

export const getTurfLocation = () => {
  const loc = [
    [
      [-13.41302, 49.67426], // Northwest point (Northern Ireland)
      [-7.49147, 58.64499], // Northeast point (Scotland)
      [1.82855, 50.10198], // Southeast point (England)
      [-5.60026, 50.30945], // Southwest point (Wales)
      [-13.41302, 49.67426], // Northwest point (Northern Ireland) - Repeat the first point to close the polygon
    ],
  ];

  const polygon = turf.polygon(loc);

  return randomPoint(turf.bbox(polygon));
};

export const getRandomBusinessHours = (
  placeType: string | undefined
): { openingTime: Date; closingTime: Date } => {
  let openingHour, closingHour;
  let category = "place";

  if (placeType) {
    category = convertDBCategoryToClientCategory(placeType);
  }

  if (category === clientCategories.Night) {
    openingHour = getRandomHour(18, 23);
    closingHour = getRandomHour(0, 6);
  } else {
    openingHour = getRandomHour(8, 10);
    closingHour = getRandomHour(18, 20);
  }

  const openingTime = new Date();
  openingTime.setHours(openingHour, 0, 0, 0);

  const closingTime = new Date();
  closingTime.setHours(closingHour, 0, 0, 0);

  return {
    openingTime,
    closingTime,
  };
};

function getRandomHour(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
