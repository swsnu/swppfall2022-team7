import { GET_TASKS_URL, ADD_TASK_URL, GET_TASK_URL, EDIT_TASK_URL, GET_USER_TASKS_URL } from '@services/api';
import axios from 'axios';
import { StateCreator } from 'zustand';
import { SliceType } from '.';
import { DocumentSpaceCardType } from './project';
import { UserType } from './user';

interface ReactionType {
  created_at: string
  emoji: string
  user: UserType
}

interface CommentType {
  content: string
  created_at: string
  id: number
  reaction_list: ReactionType[]
}

export interface TaskType {
  id: number
  project: number
  assignee: UserType
  name: string
  content: string
  createdAt: string
  updatedAt: string
  untilAt: string
  status?: 'on-going' | 'done'
  comment_list?: CommentType[]
  document_space_list?: DocumentSpaceCardType[]
};

export interface TaskSlice {
  tasks: TaskType[]
  userTasks: TaskType[]
  selectedTask: TaskType | null
  selectTask: (taskId: number) => Promise<void>
  getUserTasks: (userId: string) => Promise<void>
  getTasks: (projectId: number) => Promise<void>
  addTask: (projectId: number, name: string, content: string, assignee: string, untilAt: string) => Promise<number>
  editTask: (taskId: number, name: string, content: string, assignee: number, untilAt: string) => Promise<void>
  deleteTask: () => Promise<void>
  randomAssign: (taskList: number[], userList: number[]) => Promise<void>
};

export const createTaskSlice: StateCreator<
SliceType,
[],
[],
TaskSlice
> = (set, get) => ({
  tasks: [],
  userTasks: [],
  selectedTask: null,
  selectTask: async (taskId: number) => {
    const res = await axios.get(GET_TASK_URL(taskId));
    set({ selectedTask: res.data });
  },
  getUserTasks: async (userId: string) => {
    const res = await axios.get(GET_USER_TASKS_URL(userId));
    set({ userTasks: res.data });
  },
  getTasks: async (projectId: number) => {
    const res = await axios.get(GET_TASKS_URL(projectId));
    set({ tasks: res.data });
  },
  addTask: async (projectId: number, name: string, content: string, assignee: string, untilAt: string) => {
    const newTask = { name, content, assignee, untilAt };
    const res = await axios.post(ADD_TASK_URL(projectId), newTask);
    return res.data.id;
  },
  editTask: async (taskId: number, name: string, content: string, assignee: number, untilAt: string) => {
    const editTask = { name, content, assignee, untilAt };
    await axios.put(EDIT_TASK_URL(taskId), editTask);
  },
  deleteTask: async () => {},
  randomAssign: async (taskList: number[], userList: number[]) => {
  }
});
