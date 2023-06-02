import { getAllPositions } from "../controllers/position";
import { GOOGLE_IMG_SCRAP } from "google-img-scrap";

import { sleep } from "./sleep";
import turf from "turf";

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

  const randomPoint = turf.random("point", 1, {
    bbox: turf.bbox(polygon),
  });
  const point = randomPoint.features[0].geometry.coordinates;

  console.log(point);
  return {
    lat: point[1],
    lng: point[0],
  };
};
