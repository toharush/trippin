import { getAllPositions } from "../controllers/position";
import Scraper from "images-scraper";
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
const google = new Scraper({
  puppeteer: {},
});

export const getGoogleImage = async (label: string) => {
  const defaultImage =
    "https://th.bing.com/th/id/OIP.FjGCo53E5pd2s23Zs1TV_gHaE6?pid=ImgDet&rs=1";
  try {
    const res = await google.scrape(`${label}`);
    // await sleep(1000);

    if (res.length > 0) {
      res?.map((item) => !item?.url.includes("fbsbx"));
      if (res[0]?.url) return res[0].url;
      else if (res[1]?.url) res[1].url;
      return res[3]?.url ?? defaultImage;
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
      [125, -15],
      [113, -22],
      [154, -27],
      [144, -15],
      [125, -15],
    ],
  ];
  const polygon = turf.polygon(loc);

  const point = turf.pointOnSurface(polygon).geometry?.coordinates;
  console.log(point);
  return point;
};
