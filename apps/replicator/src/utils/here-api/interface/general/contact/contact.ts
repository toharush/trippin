import { Communication } from "../../../app";

export interface Contact {
  phone?: Communication[];
  www?: Communication[];
  email?: Communication[];
  tollFree?: Communication[];
  fax?: Communication[];
}
