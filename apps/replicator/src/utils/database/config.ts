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
export const defaultGoogleRandomRate = () =>
  Number(
    `${Math.floor(Math.random() * (5 - 1 + 1) + 1)}.${Math.floor(
      Math.random() * (9 - 1 + 1) + 1
    )}`
  );

export const defaultGoogleRandomSpend = (id: string) => {
  const names = {
    days: "ימים",
    hours: "שעות",
    minutes: "דקות",
  };
  let time = Math.floor(Math.random() * (90 - 15 + 1) + 15);

  if (id.includes("bar") && time <= 30) {
    time += 20;
  } else if (id.includes("restaurant") && time < 60) {
    time += 60;
  }

  let hours = Math.floor(time / 60);

  if (hours >= 1) {
    const days = Math.floor(hours / 60);
    if (days >= 1) {
      return `${days} ${names.days}`;
    } else {
      return `${hours} ${names.hours}`;
    }
  } else {
    return `${time} ${names.minutes}`;
  }
};

export const enum TABLES {
  ADDRESS = "address",
  PLACE = "place",
  CATEGORY = "category",
  POSITION = "position",
  EXTRA_CATEGORIES = "extra_categories",
  GOOGLE = "google",
}
