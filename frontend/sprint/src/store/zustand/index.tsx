import create from 'zustand';
import { createDocumentSlice } from './document';
import { createDocumentSpaceSlice } from './documentSpace';
import { createProjectSlice } from './project';
import { createTaskSlice } from './task';
import { createUserSlice, UserSlice } from './user';

export type SliceType = UserSlice;

const useBindStore = create<SliceType>((...props) => ({
  ...createUserSlice(...props),
  ...createProjectSlice(...props),
  ...createTaskSlice(...props),
  ...createDocumentSpaceSlice(...props),
  ...createDocumentSlice(...props)
}));

export default useBindStore;
