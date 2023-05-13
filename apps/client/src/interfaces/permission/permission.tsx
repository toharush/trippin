export default interface IPermission {
    email: string,
    type: PermissionType
}

export enum PermissionType {
  "viewer",
  "editor",
}
