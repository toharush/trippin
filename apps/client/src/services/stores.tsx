import { Activity } from "../interfaces";
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

export { getAllActivities, fetchNewComment, getCommentsByPlaceId };
