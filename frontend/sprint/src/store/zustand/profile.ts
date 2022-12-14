import axios from 'axios';
import { SliceType } from '.';
import { RcFile } from 'antd/lib/upload';
import { UserType } from './user';
import { StateCreator } from 'zustand';
import { GET_USER_URL } from '@services/api';

export interface ProfileSlice {
  selectedUser: Omit<UserType, 'id'> | null
  showProfileModal: boolean
  getProfile: (user: Omit<UserType, 'id'>) => Promise<void>
  setShowProfileModal: (val: boolean) => Promise<void>
};

export const createProfileSlice: StateCreator<
SliceType,
[],
[],
ProfileSlice
> = (set, get) => ({
  selectedUser: null,
  showProfileModal: false,
  getProfile: async (user: Omit<UserType, 'id'>) => {
    set({ selectedUser: user });
  },
  setShowProfileModal: async (val: boolean) => {
    set({ showProfileModal: val });
  }
});
