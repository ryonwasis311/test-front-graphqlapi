import { IUser } from "./user.types";
export interface TPost {
  _id?: string;
  map?: any;
  user?: IUser;
  description?: string;
  file?: string;
  followers?: number;
  messages?: number;
  createdAt?: Date;
  updatedAt?: Date;
  commentcnt?:number;
  comments?: [string];
}
