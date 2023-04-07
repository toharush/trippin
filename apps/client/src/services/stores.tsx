import { Activity } from "../../../../interfaces";
import fetchGql from "../lib/axios";

const getAllActivities = async () => {
  return (
    await fetchGql(`
  {
    places {
      id
      title
      type
      position {
        id
        lat
        lng
      }
      address {
        label
        country_name
        country_code
        state
        city
        district
        street
        postal_code
        presets {
          museums
          resturants
          sport
          shopping
          nature
          atractions
          night_life
          shows_Concerts
        }
      }
      extra {
        categories {
          name
        }
      }
      category {
        name
      }
      google {
        spend
        rate
        image_url
      }
      open_hours {
        text
        isOpen
        structured {
          start
          duration
          recurrence
        }
      }
    }
  }
  `)
  ).data.data.places as Activity[];
};

export { getAllActivities };
