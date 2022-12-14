import { GET_TASKS_URL, ADD_TASK_URL, GET_TASK_URL, EDIT_TASK_URL, GET_USER_TASKS_URL, ADD_REACTION_URL, ADD_COMMENT_URL, UPDATE_COMMENT_URL } from '@services/api';
import { shuffleList } from '@utils/utils';
import axios from 'axios';
import { StateCreator } from 'zustand';
import { SliceType } from '.';
import { DocumentSpaceCardType } from './project';
import { UserType } from './user';

export const emojis = ['good', 'bad', 'heart', 'eyes'] as const;
export type EmojiType = typeof emojis[number];
export const emojiIcons = {
  good: '๐๐ป',
  bad: '๐๐ป',
  heart: '๐งก',
  eyes: '๐'
};

export interface ReactionType {
  created_at: string
  emoji: EmojiType
  user: UserType
}

export interface CommentType {
  content: string
  created_at: string
  id: number
  reaction_list: ReactionType[]
  writer: Omit<UserType, 'email'>
}

export interface TaskType {
  id: number
  project: number
  assignee: UserType | null
  name: string
  content: string
  createdAt: string
  updatedAt: string
  untilAt: string
  status?: 'on-going' | 'done'
  comment_list?: CommentType[]
  document_space_list?: DocumentSpaceCardType[]
  until_at?: string
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
  deleteTask: (taskId: number) => Promise<void>
  randomAssign: (taskList: number[], userList: number[]) => Promise<void>
  toggleStatus: (taskId: number, isDone: boolean) => Promise<void>
  addReaction: (commendId: number, emoji: EmojiType) => Promise<void>
  addComment: (taskId: number, content: string) => Promise<void>
  deleteComment: (commentId: number) => Promise<void>
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
  deleteTask: async (taskId: number) => {
    await axios.delete(EDIT_TASK_URL(taskId));
  },
  randomAssign: async (taskList: number[], userList: number[]) => {
    taskList = shuffleList(taskList);
    for (let i = 0; i < taskList.length; i++) {
      await axios.put(EDIT_TASK_URL(taskList[i]), { assignee: userList[i] });
    }
  },
  addReaction: async (commentId: number, emoji: EmojiType) => {
    const reaction = { emoji };
    await axios.post(ADD_REACTION_URL(commentId), reaction);
  },
  toggleStatus: async (taskId: number, isDone: boolean) => {
    const editStatus = { status: isDone ? 'done' : 'on-going' };
    await axios.put(EDIT_TASK_URL(taskId), editStatus);
  },
  addComment: async (taskId: number, content: string) => {
    const comment = { content };
    await axios.post(ADD_COMMENT_URL(taskId), comment);
  },
  deleteComment: async (commentId: number) => {
    await axios.delete(UPDATE_COMMENT_URL(commentId));
  }
});
