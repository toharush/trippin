import IDailyRoute from "./dailyRoute";

export default interface ITrip {
  id: number;
  name: string;
  routes: IDailyRoute[];
  creationDate: Date;
  startDate: Date;
  endDate: Date;
}
