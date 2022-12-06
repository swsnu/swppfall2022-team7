import { ADD_DOC_SPACES_URL, GET_DOC_SPACES_URL } from './../../services/api';
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
  getDocumentSpaces: (projectId: number) => Promise<void>
  addDocumentSpace: (projectId: number, spaceName: string) => Promise<void>
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
  getDocumentSpaces: async (projectId: number) => {
    const res = await axios.get(GET_DOC_SPACES_URL(projectId));
    set({ documentSpaces: res.data });
  },
  addDocumentSpace: async (projectId: number, spaceName: string) => {
    await axios.post(ADD_DOC_SPACES_URL(projectId), { name: spaceName });
  },
  editDocumentSpace: async () => {},
  changeDocumentSpaceHead: async (documentId: number) => {},
  deleteDocumentSpace: async () => {}
});
