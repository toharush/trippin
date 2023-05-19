import { createAsyncThunk } from "@reduxjs/toolkit";
import { PermissionType } from "../../interfaces/permission/permission";
import ITrip from "../../interfaces/trip/trip";

const getTrips = (username?: string) =>
  username
    ? [
        {
          id: 1,
          name: "New York",
          ownerId: "",
          permission: [
            {
              email: "test@gmail.com",
              type: PermissionType.viewer,
            },
          ],
          routes: [
            {
              day: 1,
              activities: [
                {
                  id: "25499549:place",
                  title: "Park Place, Tulsa, OK, United States",
                  type: "locality",
                  position: {
                    id: 1,
                    lat: 36.13506,
                    lng: -95.97135,
                  },
                  address: {
                    label: "Park Place, Tulsa, OK, United States",
                    country_name: "United States",
                    country_code: "USA",
                    state: "Oklahoma",
                    city: "Tulsa",
                    district: "Park Place",
                    street: null,
                    postal_code: "74120",
                    presets: {
                      museums: 1,
                      resturants: 1,
                      sport: 1,
                      shopping: 1,
                      nature: 1,
                      atractions: 1,
                      night_life: 1,
                      shows_Concerts: 1,
                    },
                  },
                  extra: null,
                  category: {
                    name: "place",
                  },
                  google: null,
                  open_hours: null,
                },
              ],
            },
            {
              day: 2,
              activities: [
                {
                  id: "25499549:place",
                  title: "Park Place, Tulsa, OK, United States",
                  type: "locality",
                  position: {
                    id: 1,
                    lat: 36.13506,
                    lng: -95.97135,
                  },
                  address: {
                    label: "Park Place, Tulsa, OK, United States",
                    country_name: "United States",
                    country_code: "USA",
                    state: "Oklahoma",
                    city: "Tulsa",
                    district: "Park Place",
                    street: null,
                    postal_code: "74120",
                    presets: {
                      museums: 1,
                      resturants: 1,
                      sport: 1,
                      shopping: 1,
                      nature: 1,
                      atractions: 1,
                      night_life: 1,
                      shows_Concerts: 1,
                    },
                  },
                  extra: null,
                  category: {
                    name: "place",
                  },
                  google: null,
                  open_hours: null,
                },
              ],
            },
          ],
        },
      ]
    : [];

export const fetchTrips = createAsyncThunk(
  "trip/fetchTrips",
  async (props: { username?: string }) => await getTrips(props?.username)
);
