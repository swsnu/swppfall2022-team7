import create from 'zustand';
import { ContribSlice, createContribSlice } from './contribution';
import { createDocumentSpaceSlice, DocumentSpaceSlice } from './documentSpace';
import { createProfileSlice, ProfileSlice } from './profile';
import { createProjectSlice, ProjectSlice } from './project';
import { createTaskSlice, TaskSlice } from './task';
import { createUserSlice, UserSlice } from './user';

export type SliceType = UserSlice & ProjectSlice & TaskSlice & DocumentSpaceSlice & ContribSlice & ProfileSlice;

const useBindStore = create<SliceType>((...props) => ({
  ...createUserSlice(...props),
  ...createProjectSlice(...props),
  ...createTaskSlice(...props),
  ...createDocumentSpaceSlice(...props),
  ...createContribSlice(...props),
  ...createProfileSlice(...props)
}));

export default useBindStore;
