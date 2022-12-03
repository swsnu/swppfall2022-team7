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
  logIn: (email: string, password: string) => Promise<boolean>
  logOut: () => Promise<void>
  signUp: () => Promise<void>
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
      const res = await axios.post('user/signin/', { email, password });
      const user = {
        id: res.data.id,
        email: res.data.email,
        name: res.data.username
      };
      set({ user });
      return true;
    } catch (error) {
      return false;
    }
  },
  logOut: async () => {
    await axios.get('user/signout');
  },
  signUp: async () => {
  }
});
