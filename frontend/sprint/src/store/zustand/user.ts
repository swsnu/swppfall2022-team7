import { AUTO_COMPLETE_URL, GET_USER_URL, SIGNIN_URL, SIGNOUT_URL, SIGNUP_URL } from '@services/api';
import axios from 'axios';
import { StateCreator } from 'zustand';
import { SliceType } from '.';

export interface UserType {
  id: number
  username: string
  email: string
};

export interface UserSlice {
  user: UserType | null
  logIn: (email: string, password: string) => Promise<string | null>
  logOut: () => Promise<void>
  signUp: (name: string, email: string, password: string) => Promise<void>
  getUser: () => Promise<void>
  getAutoComplete: (query: string) => Promise<UserType[]>
};

export const createUserSlice: StateCreator<
SliceType,
[],
[],
UserSlice
> = (set, get) => ({
  user: null,
  logIn: async (email: string, password: string) => {
    try {
      const res = await axios.post(SIGNIN_URL, { email, password });
      const token = res.data.token;
      const user = res.data;
      localStorage.setItem('userId', user.id);
      set({ user });
      return token;
    } catch (error) {
      return null;
    }
  },
  logOut: async () => {
    await axios.get(SIGNOUT_URL);
    localStorage.clear();
  },
  signUp: async (name: string, email: string, password: string) => {
    await axios.post(SIGNUP_URL, { username: name, email, password });
  },
  getUser: async () => {
    const userId = localStorage.getItem('userId');
    if (userId === null) return;
    const res = await axios.get(GET_USER_URL(userId));
    const user = res.data;
    set({ user });
  },
  getAutoComplete: async (query: string) => {
    const res = await axios.get(AUTO_COMPLETE_URL(query));
    return res.data;
  }
});
