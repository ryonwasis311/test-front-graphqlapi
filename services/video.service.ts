import { TVideo } from "../types";
import { http } from "./api";

class VideoService {
  async create(payload: FormData) {
    const res = await http.post<boolean>(`/videos/add`, payload);
    return res.data;
  }
  async getAll() {
    const res = await http.get<any[]>(`/videos/all`);
    return res.data;
  }
  async follow(payload: any) {
    const res = await http.post<any[]>(`/follows/add`, payload);
    return res.data;
  }

  async followAll(paylaod: any) {
    const res = await http.post<any[]>(`/likevideo`, paylaod);
    return res.data;
  }
  async addComment(paylaod:any){
    const res = await http.post<any[]>(`/commments`, paylaod);
    return res.data;
  }
}

export const videoService = new VideoService();