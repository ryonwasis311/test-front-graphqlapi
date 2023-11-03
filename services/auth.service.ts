import { http } from "./api";
import {
  ILoginRequest,
  ILoginResponse,
  IRegisterRequest,
} from "../types";

class AuthService {
  async login(payload: ILoginRequest) {
    const res = await http.post<ILoginResponse>(`/auth/signin`, payload);
    return res.data;
  }

  async register(payload: IRegisterRequest) {
    const res = await http.post<ILoginResponse>(`/auth/signup`, payload);
    return res.data;
  }

  async logout(payload:any) {
    const res =await http.delete('auth/signout', payload);
    return res.data
  }


}

export const authService = new AuthService();
