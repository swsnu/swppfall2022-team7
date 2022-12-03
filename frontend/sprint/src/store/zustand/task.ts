import { StateCreator } from 'zustand';
import { SliceType } from '.';
import { UserType } from './user';

export interface TaskType {
  id: number
  project: number
  assignee: UserType
  name: string
  content: string
  createdAt: string
  updatedAt: string
  untilAt: string
};

export interface TaskSlice {
  tasks: TaskType[]
  fetchTasks: (projectId: number) => Promise<void>
  addTask: () => Promise<void>
  editTask: () => Promise<void>
  deleteTask: () => Promise<void>
};

export const createTaskSlice: StateCreator<
SliceType,
[],
[],
TaskSlice
> = (set, get) => ({
  tasks: [],
  fetchTasks: async (projectId: number) => {},
  addTask: async () => {},
  editTask: async () => {},
  deleteTask: async () => {}
});
