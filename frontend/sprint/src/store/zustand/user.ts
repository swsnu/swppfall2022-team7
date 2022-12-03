import { SIGNIN_URL, SIGNOUT_URL, SIGNUP_URL } from '@services/api';
import axios from 'axios';
import { StateCreator } from 'zustand';
import { SliceType } from '.';

export interface UserType {
  id: number
  name: string
  email: string
};

export interface UserSlice {
  user: UserType | null
  logIn: (email: string, password: string) => Promise<string | null>
  logOut: () => Promise<void>
  signUp: (name: string, email: string, password: string) => Promise<void>
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
      const user = {
        id: res.data.id,
        email: res.data.email,
        name: res.data.username
      };
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
  }
});
