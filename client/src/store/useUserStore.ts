import { create } from "zustand";
import axios from "axios";
import { IUserStore, IUser, IGetData } from "../interfaces";

const API_URL = "http://localhost:3000/api/v1";

const useUserStore = create<IUserStore>((set) => ({
  users: [],
  getUsers: async () => {
    const { data } = await axios.get<IGetData>(`${API_URL}/users`);
    set({ users: data.users });
    return data.users;
  },
  createUser: async (user: IUser) => {
    const response = await axios.post<IUser>(`${API_URL}/users`, user);
    set((state) => ({ users: [...state.users, response.data] }));
  },
  updateUser: async (id: number, user: IUser) => {
    const response = await axios.patch(`${API_URL}/users/${id}`, user);
    set((state) => ({ users: state.users.map(user => user.id === id ? response.data : user) }));
  },
  deleteUser: async (id: number) => {
    const { data } = await axios.delete(`${API_URL}/users/${id}`);
    set((state) => ({ users: state.users.filter(user => user.id !== id) }));
    return data;
  }
}));

export default useUserStore;