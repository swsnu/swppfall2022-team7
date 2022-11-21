import { StateCreator } from 'zustand';
import { SliceType } from '.';

export interface DocumentType {
  id: number
  space: number
  name: string
  document: string
  createdAt: string
};

export interface DocumentSlice {
  documents: DocumentType[]
  fetchDocuments: (projectId: number) => Promise<void>
  addDocument: () => Promise<void>
  editDocument: () => Promise<void>
  deleteDocument: () => Promise<void>
};

export const createDocumentSlice: StateCreator<
SliceType,
[],
[],
DocumentSlice
> = (set, get) => ({
  documents: [],
  fetchDocuments: async (projectId: number) => {},
  addDocument: async () => {},
  editDocument: async () => {},
  deleteDocument: async () => {}
});
