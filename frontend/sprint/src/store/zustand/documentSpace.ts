import { StateCreator } from 'zustand';
import { SliceType } from '.';

export interface DocumentSpaceType {
  id: number
  name: string
  project: number
  head: number
};

export interface DocumentSpaceSlice {
  documentSpaces: DocumentSpaceType[]
  getDocumentSpaces: (projectId: number) => Promise<void>
  addDocumentSpace: () => Promise<void>
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
  getDocumentSpaces: async (projectId: number) => {},
  addDocumentSpace: async () => {},
  editDocumentSpace: async () => {},
  changeDocumentSpaceHead: async (documentId: number) => {},
  deleteDocumentSpace: async () => {}
});
