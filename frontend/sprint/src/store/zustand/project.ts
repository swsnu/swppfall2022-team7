import { ADD_PROJECT_URL, GET_PROJECTS_URL, GET_PROJECT_URL, UPDATE_MEMBER_URL, UPDATE_PROJECT_URL } from '@services/api';
import axios from 'axios';
import { StateCreator } from 'zustand';
import { SliceType } from '.';
import { TaskType } from './task';
import { UserType } from './user';

export interface DocumentSpaceCardType {
  id: number
  name: string
  head: number
  created_at: string
}

export interface ProjectType {
  id: number
  name: string
  subject: string
  manager: number
  last_modified: string
  member_list: UserType[]
  document_number: number
  task_list?: TaskType[]
  document_space_list?: DocumentSpaceCardType[]
};

export interface ProjectSlice {
  projects: ProjectType[]
  selectedProject: ProjectType | null
  selectProject: (projectId: number) => Promise<void>
  getProjects: (userId: string) => Promise<void>
  addProject: (name: string, subject: string, member_list: string[]) => Promise<void>
  editProject: (projectId: number, name: string, subject: string) => Promise<void>
  deleteProject: (projectId: number) => Promise<void>
  addMember: (projectId: number, idList: number[]) => Promise<void>
  deleteMember: (projectId: number, userId: number) => Promise<void>
};

export const createProjectSlice: StateCreator<
SliceType,
[],
[],
ProjectSlice
> = (set, get) => ({
  projects: [],
  selectedProject: null,
  selectProject: async (projectId: number) => {
    const res = await axios.get(GET_PROJECT_URL(projectId));
    set({ selectedProject: res.data });
  },
  getProjects: async (userId: string) => {
    const res = await axios.get(GET_PROJECTS_URL(userId));
    set({ projects: res.data.project_list });
  },
  addProject: async (name: string, subject: string, memberList: string[]) => {
    const newProject = { name, subject, member_list: memberList };
    await axios.post(ADD_PROJECT_URL, newProject);
  },
  editProject: async (projectId: number, name: string, subject: string) => {
    await axios.put(UPDATE_PROJECT_URL(projectId), { name, subject });
  },
  deleteProject: async (projectId: number) => {
    await axios.delete(UPDATE_PROJECT_URL(projectId));
  },
  addMember: async (projectId: number, idList: number[]) => {
    for (const id of idList) {
      await axios.put(UPDATE_MEMBER_URL(projectId, id));
    }
  },
  deleteMember: async (projectId: number, userId: number) => {
    await axios.delete(UPDATE_MEMBER_URL(projectId, userId));
  }
});
