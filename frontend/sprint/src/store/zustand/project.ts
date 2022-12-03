import { GET_PROJECTS_URL } from '@services/api';
import axios from 'axios';
import { StateCreator } from 'zustand';
import { SliceType } from '.';
import { UserType } from './user';

export interface ProjectType {
  id: number
  name: string
  subject: string
  manager: number
  last_modified: string
  member_list: UserType[]
  document_number: number
};

export interface ProjectSlice {
  projects: ProjectType[]
  getProjects: (userId: string) => Promise<void>
  addProject: () => Promise<void>
  editProject: () => Promise<void>
  deleteProject: () => Promise<void>
};

export const createProjectSlice: StateCreator<
SliceType,
[],
[],
ProjectSlice
> = (set, get) => ({
  projects: [],
  getProjects: async (userId: string) => {
    const res = await axios.get(GET_PROJECTS_URL(userId));
    set({ projects: res.data.project_list });
  },
  addProject: async () => {},
  editProject: async () => {},
  deleteProject: async () => {}
});
