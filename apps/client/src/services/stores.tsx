import { Activity } from "../interfaces";
import IClientCategory from "../interfaces/activity/clientCategory";
import ICoordinate from "../interfaces/activity/coordinate";
import IComment from "../interfaces/comment/comment";
import fetchGql from "../lib/axios";

const fetchNewComment = async (
  place_id: string,
  user_id: string,
  text: string
) => {
  return await fetchGql(
    `
    mutation newComment {
      addComment(place_id: "${place_id}", user_id: "${user_id}", text: "${text}") {
        id
      }
    }
    `
  );
};

const fetchCreateTrip = async (
  user_id: string | null,
  cityName: string,
  cityCenter: ICoordinate,
  radius: number,
  categoryPriorities: IClientCategory[],
  selectedActivities: string[],
  startDate: number,
  endDate: number,
  startHour: number,
  endHour: number
) => {
  return await fetchGql(
    `
    mutation createTrip {
      createTrip(
      user_id: "${user_id}",
      cityName: "${cityName}",
      cityCenter: {
        lat: ${cityCenter.lat},
        lng: ${cityCenter.lng}
      } ,
      radius: ${radius},
      categoryPriorities: [${getCategoryPrioritiesQuery(categoryPriorities)}],
      selectedActivitiesIds: ${JSON.stringify(selectedActivities)},
      startDate: ${startDate},
      endDate: ${endDate},
      startHour: ${startHour},
      endHour: ${endHour}) {
        id
        name
        routes {
          index
          date
          activities {
            id
            title
            type
            close_hour
            open_hour
            startTime 
            endTime
            category {
              name
            }
            google {
              spend
              rate
              image_url
            }
            position {
              lat
              lng
            }
          }
        }
      }
    }
    `
  );
};

const getCategoryPrioritiesQuery = (categoryPriorities: IClientCategory[]) => {
  return categoryPriorities.map((cat) => {
    return `{key: "${cat.key}", value: ${cat.value}}`;
  });
};

const getCommentsByPlaceId = async (place_id: string) => {
  return (await (
    await fetchGql(
      `
     {
      commentsByPlaceId(place_id: "${place_id}") {
        id
        place_id
        user_id
        text
        date
      }
    }
    `
    )
  ).data.data.commentsByPlaceId) as IComment[];
};

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
      close_hour
      open_hour
    }
  }
  `)
  ).data.data.places as Activity[];
};

export {
  getAllActivities,
  fetchNewComment,
  getCommentsByPlaceId,
  fetchCreateTrip,
};
