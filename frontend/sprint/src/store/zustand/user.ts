import { EDIT_IMAGE_URL } from './../../services/api';
import { AUTO_COMPLETE_URL, EDIT_USER_URL, GET_NEW_NOTI_URL, GET_NOTI_URL, GET_USER_URL, SIGNIN_URL, SIGNOUT_URL, SIGNUP_URL } from '@services/api';
import { RcFile } from 'antd/lib/upload';
import axios from 'axios';
import { StateCreator } from 'zustand';
import { SliceType } from '.';

export interface UserType {
  id: number
  username: string
  email: string
  image?: string
};

export interface NotificationType {
  id: number
  created_at: string
  link: string
  content: string
  checked: boolean
};

export interface UserSlice {
  user: UserType | null
  noti: NotificationType[] | null
  newNoti: number
  getNewNoti: () => Promise<void>
  getNoti: () => Promise<void>
  logIn: (email: string, password: string) => Promise<string | null>
  logOut: () => Promise<void>
  signUp: (name: string, email: string, password: string) => Promise<void>
  getUser: () => Promise<void>
  getAutoComplete: (query: string, projectId: number) => Promise<UserType[]>
  getUserName: (userId: string) => Promise<string>
  editUser: (userName: string) => Promise<void>
  uploadImage: (file: RcFile) => Promise<void>
  deleteImage: () => Promise<void>
};

export const createUserSlice: StateCreator<
SliceType,
[],
[],
UserSlice
> = (set, get) => ({
  user: null,
  noti: null,
  newNoti: 0,
  getNewNoti: async () => {
    const res = await axios.get(GET_NEW_NOTI_URL);
    set({ newNoti: res.data.new_notification_num });
  },
  getNoti: async () => {
    const res = await axios.get(GET_NOTI_URL);
    set({ noti: res.data });
  },
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
    set({ user: null });
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
  getAutoComplete: async (query: string, projectId: number = -1) => {
    const res = await axios.get(AUTO_COMPLETE_URL(query, projectId));
    return res.data;
  },
  getUserName: async (userId: string) => {
    const res = await axios.get(GET_USER_URL(userId));
    return res.data.username as string;
  },
  editUser: async (userName: string) => {
    await axios.put(EDIT_USER_URL, { username: userName });
  },
  uploadImage: async (file: RcFile) => {
    await axios.post(EDIT_IMAGE_URL, { image: file }, { headers: { 'Content-Type': 'multipart/form-data' } });
  },
  deleteImage: async () => {
    await axios.delete(EDIT_IMAGE_URL);
  }
});
