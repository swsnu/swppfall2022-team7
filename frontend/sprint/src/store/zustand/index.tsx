import create from 'zustand';
import { ContribSlice, createContribSlice } from './contribution';
import { createDocumentSlice, DocumentSlice } from './document';
import { createDocumentSpaceSlice, DocumentSpaceSlice } from './documentSpace';
import { createProjectSlice, ProjectSlice } from './project';
import { createTaskSlice, TaskSlice } from './task';
import { createUserSlice, UserSlice } from './user';

export type SliceType = UserSlice & ProjectSlice & TaskSlice & DocumentSpaceSlice & DocumentSlice & ContribSlice;

const useBindStore = create<SliceType>((...props) => ({
  ...createUserSlice(...props),
  ...createProjectSlice(...props),
  ...createTaskSlice(...props),
  ...createDocumentSpaceSlice(...props),
  ...createDocumentSlice(...props),
  ...createContribSlice(...props)
}));

export default useBindStore;
