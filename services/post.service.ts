import { TPost } from "../types";
import { http } from "./api";

class PostService {
  async create(payload: FormData) {
    const res = await http.post<boolean>(`/posts/add`, payload);
    return res.data;
  }
  async follow(payload: any) {
    const res = await http.post<boolean>(`/follows/add`, payload);
    return res.data;
  }
  async getAll() {
    const res = await http.get<any[]>(`/posts/postall`);
    return res.data;
  }
  async getAllVideo(){
    const res =await http.get<any[]> (`/posts/videoall`);
    return res.data;
  }
  async followAll(payload: any) {
    const res = await http.post<any[]>(`/follows`, payload);
    return res.data;
  }
  async addComment(payload: any) {
    const res = await http.post<any[]>(`/comments`, payload);
    return res.data;
  }
}

export const postService = new PostService();
