import { StateCreator } from 'zustand';
import { SliceType } from '.';
import { UserType } from './user';

export interface ProjectType {
  id: number
  name: string
  subject: string
  updatedAt: string
  team: UserType[]
};

export interface ProjectSlice {
  projects: ProjectType[]
  fetchProjects: (userId: number) => Promise<void>
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
  fetchProjects: async (userId: number) => {
  },
  addProject: async () => {},
  editProject: async () => {},
  deleteProject: async () => {}
});
