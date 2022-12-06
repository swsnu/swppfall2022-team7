import { ADD_DOC_SPACES_URL, GET_DOC_SPACES_URL, GET_TASK_DOCS_URL, LINK_TASK_DOC_URL } from '@services/api';
import { StateCreator } from 'zustand';
import { SliceType } from '.';
import axios from 'axios';

export interface DocumentSpaceType {
  id: number
  name: string
  project: number
  head: number
};

export interface DocumentSpaceSlice {
  documentSpaces: DocumentSpaceType[]
  taskSpaces: DocumentSpaceType[]
  getDocumentSpaces: (projectId: number) => Promise<void>
  addDocumentSpace: (projectId: number, spaceName: string) => Promise<void>
  getTaskSpaces: (taskId: number) => Promise<void>
  linkDocumentSpace: (taskId: number, spaceId: number, isLinked: boolean) => Promise<void>
  editDocumentSpace: () => Promise<void>
  changeDocumentSpaceHead: (documentId: number) => Promise<void>
  deleteDocumentSpace: () => Promise<void>
};

export const createDocumentSpaceSlice: StateCreator<
SliceType,
[],
[],
DocumentSpaceSlice
> = (set, get) => ({
  documentSpaces: [],
  taskSpaces: [],
  getDocumentSpaces: async (projectId: number) => {
    const res = await axios.get(GET_DOC_SPACES_URL(projectId));
    set({ documentSpaces: res.data });
  },
  addDocumentSpace: async (projectId: number, spaceName: string) => {
    await axios.post(ADD_DOC_SPACES_URL(projectId), { name: spaceName });
  },
  getTaskSpaces: async (taskId: number) => {
    const res = await axios.get(GET_TASK_DOCS_URL(taskId));
    set({ taskSpaces: res.data });
  },
  linkDocumentSpace: async (taskId: number, spaceId: number, isLinked: boolean) => {
    if (isLinked) await axios.post(LINK_TASK_DOC_URL(taskId), { documentId: spaceId });
    else await axios.delete(LINK_TASK_DOC_URL(taskId), { data: { documentId: spaceId } });
  },
  editDocumentSpace: async () => {},
  changeDocumentSpaceHead: async (documentId: number) => {},
  deleteDocumentSpace: async () => {}
});
