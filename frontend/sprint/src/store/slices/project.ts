import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { dummyProjects, ProjectType, TaskType } from '@utils/dummy';
import { RootState } from '..';

type ProjectState = ProjectType[];

const initialState = dummyProjects;

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    addProject: (state, action) => {
      state.push(action.payload);
    },
    addTask: (state, action: PayloadAction<{ projectId: number, newTask: TaskType }>) => {
      const project = state.find(project => project.id === action.payload.projectId);
      if (project !== undefined) project.tasks.push(action.payload.newTask);
    }
  }
});

export const projectActions = projectSlice.actions;
export const selectProject: (state: RootState) => ProjectState = (state: RootState) => state.project;
const projectReducer = projectSlice.reducer;
export default projectReducer;
