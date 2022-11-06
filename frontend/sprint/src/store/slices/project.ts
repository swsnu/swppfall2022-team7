import { createSlice } from '@reduxjs/toolkit';
import { dummyProjects, ProjectType } from '@utils/dummy';
import { RootState } from '..';

type ProjectState = ProjectType[];

const initialState = dummyProjects;

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    addProject: (state, action) => {
      state.push(action.payload);
    }
  }
});

export const projectActions = projectSlice.actions;
export const selectProject: (state: RootState) => ProjectState = (state: RootState) => state.project;
const projectReducer = projectSlice.reducer;
export default projectReducer;
