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
    },
    editTask: (state, action: PayloadAction<{ projectId: number, taskId: number, newTaskName: string, newTaskDescription: string, newTaskDate: string }>) => {
      const project = state.find(project => project.id === action.payload.projectId);
      if (project !== undefined) {
        const task = project.tasks.find(task => task.id === action.payload.taskId);
        if (task === undefined) return;
        task.name = action.payload.newTaskName;
        task.description = action.payload.newTaskDescription;
        task.dueDate = action.payload.newTaskDate;
      }
    },
    randomAssign: (state, action: PayloadAction<{ projectId: number, taskList: number[], memberList: number[] }>) => {
      const project = state.find(project => project.id === action.payload.projectId);
      if (project === undefined) return;
      let index = 0;
      for (const task of project.tasks) {
        if (task.id === action.payload.taskList[index]) {
          const member = project.members.find(member => member.id === action.payload.memberList[index]);
          if (member !== undefined) task.members = [member];
          index += 1;
        }
        if (index === action.payload.taskList.length) break;
      }
    }
  }
});

export const projectActions = projectSlice.actions;
export const selectProject: (state: RootState) => ProjectState = (state: RootState) => state.project;
const projectReducer = projectSlice.reducer;
export default projectReducer;
