import { IUser } from "./user.types";

export interface TVideo {
  _id?: string;
  title?: string;
  description?: string;
  file:string;
  tags?: any;
  user?: IUser;
  created?: Date;
  updated?: Date;
  commentcnt?:string;
  comments?:[string];
  followers?:number;
}
