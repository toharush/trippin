import dotenv from "dotenv";

dotenv.config();

export const schema = process.env.DB_SCHEMA || "public";
export const table = process.env.DB_TABLE || "trippin";
export const user = process.env.DB_USER || "postgres";
export const start_value = 1;
export const min_value = 1;
export const cache = 1;
export const increase = 1;
export const max_value = 999999;
export const defaultOpenHours = `[
  {
    "text": ["Mon-Sun: 00:00 - 23:59"],
    "isOpen": "true",
    "categories": [
      {
        "id": "100-1000-0000",
      },
      {
        "id": "600-6300-0244",
      },
    ],
    "structured": [
      {
        "start": "T000000",
        "duration": "PT23H59M",
        "recurrence": "FREQ:DAILY;BYDAY:MO,TU,WE,TH,FR,SA,SU",
      },
      {
        "start": "T170000",
        "duration": "PT06H59M",
        "recurrence": "FREQ:DAILY;BYDAY:MO,TU,WE,TH,FR,SA",
      },
      {
        "start": "T180000",
        "duration": "PT05H59M",
        "recurrence": "FREQ:DAILY;BYDAY:SU",
      },
    ],
  },
]`;
export const defaultCategories = 1;
export const defaultPosition = 1;
export const defaultGoogleRandomRate = () => {
  const first_dig = Math.floor(Math.random() * (5 - 1 + 1) + 1);
  if (first_dig === 5) {
    return Number(`${first_dig}.0`);
  }
  return Number(`${first_dig}.${Math.floor(Math.random() * (9 - 1 + 1) + 1)}`);
};

export const defaultGoogleRandomSpend = () => {
  const minMinutes = 5;
  const maxMinutes = 120;
  const randomMinutes =
    Math.floor(Math.random() * (maxMinutes - minMinutes + 1)) + minMinutes;

  const milliseconds = randomMinutes * 60 * 1000;

  return milliseconds;
};

export const enum TABLES {
  ADDRESS = "address",
  PLACE = "place",
  CATEGORY = "category",
  POSITION = "position",
  EXTRA_CATEGORIES = "extra_categories",
  GOOGLE = "google",
  COMMENTS = "comment",
  TRIP = "trip",
  DAILY_ROUTE = "daily_route",
  DAILY_ROUTE_ACTIVITY = "daily_route_activity",
}
