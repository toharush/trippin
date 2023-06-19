import IDailyRoute from "./dailyRoute";

export default interface ITrip {
  id: number;
  name: string;
  routes: IDailyRoute[];
  creation_date: Date;
  start_date: Date;
  end_date: Date;
}
