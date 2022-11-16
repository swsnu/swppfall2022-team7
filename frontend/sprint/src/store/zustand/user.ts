import { StateCreator } from 'zustand';
import { SliceType } from '.';

export interface UserType {
  id: number
  name: string
};

export interface UserSlice {
  user: UserType | null
  logIn: (email: string, password: string) => Promise<void>
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
  },
  logOut: async () => {
  },
  signUp: async () => {
  }
});
