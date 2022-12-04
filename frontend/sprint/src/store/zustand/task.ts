import { EDIT_TASK_URL } from './../../services/api';
import { GET_TASKS_URL, ADD_TASK_URL, GET_TASK_URL } from '@services/api';
import axios from 'axios';
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
  selectedTask: TaskType | null
  selectTask: (taskId: number) => Promise<void>
  getTasks: (projectId: number) => Promise<void>
  addTask: (projectId: number, name: string, content: string, assignee: number, untilAt: string) => Promise<void>
  editTask: (taskId: number, name: string, content: string, assignee: number, untilAt: string) => Promise<void>
  deleteTask: () => Promise<void>
};

export const createTaskSlice: StateCreator<
SliceType,
[],
[],
TaskSlice
> = (set, get) => ({
  tasks: [],
  selectedTask: null,
  selectTask: async (taskId: number) => {
    const res = await axios.get(GET_TASK_URL(taskId));
    set({ selectedTask: res.data });
  },
  getTasks: async (projectId: number) => {
    const res = await axios.get(GET_TASKS_URL(projectId));
    set({ tasks: res.data });
  },
  addTask: async (projectId: number, name: string, content: string, assignee: number, untilAt: string) => {
    const newTask = { name, content, assignee, untilAt };
    const res = await axios.post(ADD_TASK_URL(projectId), newTask);
    console.log(res);
  },
  editTask: async (taskId: number, name: string, content: string, assignee: number, untilAt: string) => {
    const editTask = { name, content, assignee, untilAt };
    await axios.put(EDIT_TASK_URL(taskId), editTask);
  },
  deleteTask: async () => {}
});
