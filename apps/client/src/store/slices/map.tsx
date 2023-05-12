import { duration } from "@mui/material";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MarkerPoint } from "../../interfaces";
import { TotalRoute } from "../../interfaces/totalRoute/totalRoute";
import { DayRoute } from "../../interfaces/dayRoute/dayRoute"
import update from 'lodash';

interface MapState {
  selectedActivitiesMarkerPoints: MarkerPoint[];
  totalRoute: TotalRoute;
  flyTo: {
    latlng: [number, number];
    zoom: number;
  };
  loading: boolean;
}

const mp1: MarkerPoint = {id:"25499549:place",type:2,name:"Park Place, Tulsa, OK, United States",location:[36.13506,-95.97135],show:true,data:{"id":"25499549:place","title":"Park Place, Tulsa, OK, United States","type":"locality","position":{"id":1,"lat":36.13506,"lng":-95.97135},"address":{"label":"Park Place, Tulsa, OK, United States","country_name":"United States","country_code":"USA","state":"Oklahoma","city":"Tulsa","district":"Park Place","street":null,"postal_code":"74120","presets":{"museums":1,"resturants":1,"sport":1,"shopping":1,"nature":1,"atractions":1,"night_life":1,"shows_Concerts":1}},"extra":null,"category":{"name":"place"},"google":null,"open_hours":null}};
const mp2: MarkerPoint = {id:"8409vyng-407e977c2cba0344dd8be57fca58e68d:restaurant",type:2,name:"Popeyes Louisiana Kitchen",location:[33.56812,-92.67983],show:true,data:{"id":"8409vyng-407e977c2cba0344dd8be57fca58e68d:restaurant","title":"Popeyes Louisiana Kitchen","type":"place","position":{"id":12,"lat":33.56812,"lng":-92.67983},"address":{"label":"Popeyes Louisiana Kitchen, Calhoun 4, Camden, AR 71701, United States","country_name":"United States","country_code":"USA","state":"Arkansas","city":"Camden","district":null,"street":"Calhoun 4","postal_code":"71701","presets":{"museums":14,"resturants":14,"sport":14,"shopping":14,"nature":14,"atractions":14,"night_life":14,"shows_Concerts":14}},"extra":null,"category":{"name":"restaurant"},"google":null,"open_hours":[{"text":["Mon-Thu, Sun: 10:00 - 22:00","Fri, Sat: 10:00 - 23:00"],"isOpen":true,"structured":[{"start":"T100000","duration":"PT12H00M","recurrence":"FREQ:DAILY;BYDAY:MO,TU,WE,TH,SU"},{"start":"T100000","duration":"PT13H00M","recurrence":"FREQ:DAILY;BYDAY:FR,SA"}]}]}};
const mp3: MarkerPoint = {id:"840aabd1-beb113f47c5703a73946cf609c239ec7:restaurant",type:2,name:"Whiting Cafe",location:[39.59027,-95.61215],show:true,data:{"id":"840aabd1-beb113f47c5703a73946cf609c239ec7:restaurant","title":"Whiting Cafe","type":"place","position":{"id":9,"lat":39.59027,"lng":-95.61215},"address":{"label":"Whiting Cafe, 308 Whiting St, Whiting, KS 66552-9504, United States","country_name":"United States","country_code":"USA","state":"Kansas","city":"Whiting","district":null,"street":"Whiting St","postal_code":"66552-9504","presets":{"museums":13,"resturants":13,"sport":13,"shopping":13,"nature":13,"atractions":13,"night_life":13,"shows_Concerts":13}},"extra":null,"category":{"name":"restaurant"},"google":null,"open_hours":[{"text":["Mon-Thu, Sat: 06:00 - 14:00","Fri: 06:00 - 21:00"],"isOpen":true,"structured":[{"start":"T060000","duration":"PT08H00M","recurrence":"FREQ:DAILY;BYDAY:MO,TU,WE,TH,SA"},{"start":"T060000","duration":"PT15H00M","recurrence":"FREQ:DAILY;BYDAY:FR"}]}]}};
const mp4: MarkerPoint = {id:"8409vvzp-a029bee4bdeb4a2f9729d7e354fa9838:restaurant",type:2,name:"Woods at Sau Tech Diner",location:[33.63206,-92.71822],show:true,data:{"id":"8409vvzp-a029bee4bdeb4a2f9729d7e354fa9838:restaurant","title":"Woods at Sau Tech Diner","type":"place","position":{"id":25,"lat":33.63206,"lng":-92.71822},"address":{"label":"Woods at Sau Tech Diner, 6415 Spellman Rd, Camden, AR 71701-1903, United States","country_name":"United States","country_code":"USA","state":"Arkansas","city":"Camden","district":null,"street":"Spellman Rd","postal_code":"71701-1903","presets":{"museums":32,"resturants":32,"sport":32,"shopping":32,"nature":32,"atractions":32,"night_life":32,"shows_Concerts":32}},"extra":null,"category":{"name":"restaurant"},"google":null,"open_hours":null}};
const mp5: MarkerPoint = {id:"8409yevf-454f74bfcfa746959a3e901435a36284:restaurant",type:2,name:"Rick's Place Bar and Grill",location:[37.5281,-95.80044],show:true,data:{"id":"8409yevf-454f74bfcfa746959a3e901435a36284:restaurant","title":"Rick's Place Bar and Grill","type":"place","position":{"id":49,"lat":37.5281,"lng":-95.80044},"address":{"label":"Rick's Place Bar and Grill, 2402 E Washington St, Fredonia, KS 66736, United States","country_name":"United States","country_code":"USA","state":"Kansas","city":"Fredonia","district":null,"street":"E Washington St","postal_code":"66736","presets":{"museums":51,"resturants":51,"sport":51,"shopping":51,"nature":51,"atractions":51,"night_life":51,"shows_Concerts":51}},"extra":null,"category":{"name":"restaurant"},"google":null,"open_hours":[{"text":["Tue-Sat: 06:00 - 23:59","Sun: 07:00 - 23:59"],"isOpen":true,"structured":[{"start":"T060000","duration":"PT17H59M","recurrence":"FREQ:DAILY;BYDAY:TU,WE,TH,FR,SA"},{"start":"T070000","duration":"PT16H59M","recurrence":"FREQ:DAILY;BYDAY:SU"}]}]}};


const initialState: MapState = {
  selectedActivitiesMarkerPoints: [],
  totalRoute: {
    duration:2,
    dayRoutes: [
     {route: [mp1,mp2]},
     {route: [mp3,mp4,mp5]},
    ]
  },
  flyTo: {
    latlng: [39.59027,-95.61215],
    zoom: 5,
  },
  loading: false,
};

const stores = createSlice({
  name: "map",
  initialState: initialState,
  reducers: {
    AddMarkerPointToSelectedActivities: (state, action: PayloadAction<MarkerPoint>) => ({
      ...state,
      selectedActivitiesMarkerPoints: [...state.selectedActivitiesMarkerPoints, action.payload],
    }),
    RemoveMarkerPointFromSelectedActivities: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        selectedActivitiesMarkerPoints: state.selectedActivitiesMarkerPoints.filter(
          (selectedActivitieMarkerPoint) => selectedActivitieMarkerPoint.id !== action.payload
        ),
      };
    },
    HideAllSelectedActivitiesMarkers: (state) => {
      return {
        ...state,
        selectedActivitiesMarkerPoints: state.selectedActivitiesMarkerPoints.map(
          (samp) => {
            console.log("hide");
            return { ...samp, show: false };
          })
      }
    },
    ShowDayRoute: (state, action: PayloadAction<number>) => {
      const newTotalRoute: TotalRoute = {
        ...state.totalRoute, // Copy the existing totalRoute object
        dayRoutes: state.totalRoute.dayRoutes.map((dayRoute: DayRoute, dayNumber: number) => {
          if (dayNumber === action.payload) {
            const updatedRoute = dayRoute.route.map((point) => ({ ...point, show: true }));
            return { ...dayRoute, route: updatedRoute };
          } else {
            const updatedRoute = dayRoute.route.map((point) => ({ ...point, show: false }));
            return { ...dayRoute, route: updatedRoute };
          }
        }),
      };
      return {
        ...state,
        totalRoute: newTotalRoute,
      };
    },
    SetFlyTo: (
      state,
      action: PayloadAction<{
        latlng: [number, number];
        zoom: number;
      }>
    ) => ({ ...state, flyTo: action.payload }),
  },
});

export const {AddMarkerPointToSelectedActivities,
              RemoveMarkerPointFromSelectedActivities,
              HideAllSelectedActivitiesMarkers,
              SetFlyTo,
              ShowDayRoute}
  = stores.actions;
export default stores.reducer;
