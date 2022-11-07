import { AnyAction, configureStore, EnhancedStore, ThunkMiddleware } from '@reduxjs/toolkit';
import { choi, ProjectType } from '@utils/dummy';
import reducer, { projectActions } from './project';

describe('project reducer', () => {
  let store: EnhancedStore<
  { project: ProjectType[] },
  AnyAction,
  [ThunkMiddleware<{ project: ProjectType[] }, AnyAction, undefined>]
  >;
  const mockProject: ProjectType = {
    id: 1,
    description: 'test',
    name: 'dummy',
    subject: 'test',
    updatedAt: '2022-02-02',
    members: [choi],
    documents: 0,
    documentSpaces: [],
    tasks: []
  };
  const mockTask = {
    name: 'Task 1',
    id: 1,
    updatedAt: '2 days ago',
    members: [],
    description: 'Description 1',
    documentSpaces: []
  };

  beforeAll(() => {
    store = configureStore({ reducer: { project: reducer } });
  });
  it('should handle add project', () => {
    store.dispatch(projectActions.addProject(mockProject));
  });
  it('should handle add task', () => {
    store.dispatch(projectActions.addTask({ projectId: mockProject.id, newTask: mockTask }));
  });
  it('should handle add task when project is undefined', () => {
    store.dispatch(projectActions.addTask({ projectId: 0, newTask: mockTask }));
  });
  it('should handle edit task', () => {
    store.dispatch(projectActions.editTask({ projectId: 1, taskId: 1, newTaskName: 'test', newTaskDescription: 'test desc' }));
  });
  it('should handle edit task w/o valid task', () => {
    store.dispatch(projectActions.editTask({ projectId: 1, taskId: 0, newTaskName: 'test', newTaskDescription: 'test desc' }));
  });
  it('should handle random assign', () => {
    store.dispatch(projectActions.randomAssign({ projectId: 1, taskList: [2], memberList: [2] }));
    store.dispatch(projectActions.randomAssign({ projectId: 1, taskList: [1, 2], memberList: [1] }));
  });
  it('should handle random assign w/o project', () => {
    store.dispatch(projectActions.randomAssign({ projectId: 0, taskList: [1, 2], memberList: [1, 2] }));
  });
});
