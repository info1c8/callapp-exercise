import { create } from "zustand";
import axios from "axios";
import { IUserStore, IGetData, ICreateData, IUpdateData, IDeleteData } from "../interfaces";

const API_URL = "http://localhost:3000/api/v1";

const useUserStore = create<IUserStore>((set) => ({
  users: [],
  getUsers: async () => {
    const { data } = await axios.get<IGetData>(`${API_URL}/users`);
    set({ users: data.users });
    return data;
  },
  createUser: async (user) => {
    const { data } = await axios.post<ICreateData>(`${API_URL}/users`, user);
    set((state) => ({ users: [data.user, ...state.users] }));
    return data;
  },
  updateUser: async (id, user) => {
    const { data } = await axios.patch<IUpdateData>(`${API_URL}/users/${id}`, user);
    set((state) => ({ users: state.users.map(user => user.id === id ? data.user : user) }));
    return data;
  },
  deleteUser: async (id) => {
    const { data } = await axios.delete<IDeleteData>(`${API_URL}/users/${id}`);
    set((state) => ({ users: state.users.filter(user => user.id !== id) }));
    return data;
  }
}));

export default useUserStore;