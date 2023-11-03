import {
  INameChangeRequest,
  IPasswordChangeRequest,
  IUser,
  RecoverPwdRequest,
} from "../types";
import { http } from "./api";

class UserService {
  async getAll() {
    const res = await http.get('/users/all');
    return res.data;
  }
  async addUser(payload:IUser) {
    const res = await http.post('/users/add',payload);
    return res.data;
  }

  async deleteUser(id:string) {
    const res = await http.delete(`/user/${id}`);
    return res.data;
  }

  async updateUser(payload:any) {
    const res = await http.patch (`/user/${payload.userId}`,payload.newUser);
    return res.data
  }

  async recoverPwd(payload: RecoverPwdRequest) {
    const res = await http.post<boolean>(`/recover`, payload);
    return res.data;
  }

  async verifyEmail(code: string) {
    const res = await http.get<boolean>(`/recover/${code}`);
    return res.data;
  }

  async changeName(payload: INameChangeRequest) {
    const res = await http.patch<boolean>(`/user/settings/username`, payload);
    return res.data;
  }

  async changePwd(payload: IPasswordChangeRequest) {
    const res = await http.patch<boolean>(`/user/settings/password`, payload);
    return res.data;
  }
  async changeAvatar(payload: FormData) {
    const res = await http.patch<boolean>(`/user/settings/avatar`, payload);
    return res.data;
  }

  async getUserById(id: string) {
    const res = await http.get<IUser>(`/user/id/${id}`);
    return res.data;
  }
  async getUserByName(username: string) {
    const res = await http.get<IUser>(`/user/${username}`);
    return res.data;
  }
}

export const userService = new UserService();
