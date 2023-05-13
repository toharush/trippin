import IPermission from "../permission/permission";
import IRoute from "../route/route";

export default interface ITrip {
  id: number;
  name: string;
  routes: IRoute[];
  permission: IPermission[];
  ownerId: string;
}
