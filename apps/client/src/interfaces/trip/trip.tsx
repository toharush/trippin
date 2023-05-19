import IPermission from "../permission/permission";
import IRoute from "../route/route";

export default interface ITrip {
  id: number;
  name: string;
  routes: IRoute[];
  image_path?: string;
  permission: IPermission[];
  ownerId: string;
}
