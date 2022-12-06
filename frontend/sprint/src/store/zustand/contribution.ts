import { GET_QUEST_URL, GET_TIMELINE_URL } from '@services/api';
import { stringMap } from 'aws-sdk/clients/backup';
import axios from 'axios';
import { StateCreator } from 'zustand';
import { SliceType } from '.';
import { UserType } from './user';

export interface QuestContribType {
  user: UserType
  board: {
    'Compose a comment': 'Done' | 'On Going'
    'Upload a document': 'Done' | 'On Going'
    'React to a comment': 'Done' | 'On Going'
    'Complete a task': 'Done' | 'On Going'
  }
};

export interface LogType {
  user: UserType
  created_at: string
  message: string
}

export interface TimelineContribType {
  date_str: string
  logs: LogType[]
};

export interface ContribSlice {
  quest: QuestContribType[]
  timeline: TimelineContribType[]
  getQuest: (projectId: number) => Promise<void>
  getTimeline: (projectId: number) => Promise<void>
};

export const createContribSlice: StateCreator<
SliceType,
[],
[],
ContribSlice
> = (set, get) => ({
  quest: [],
  timeline: [],
  getQuest: async (projectId: number) => {
    const res = await axios.get(GET_QUEST_URL(projectId));
    set({ quest: res.data });
  },
  getTimeline: async (projectId: number) => {
    const res = await axios.get(GET_TIMELINE_URL(projectId));
    set({ timeline: res.data });
  }
});
