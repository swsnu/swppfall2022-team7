export const BASE_URL = 'https://api.swppsprint.site/';

export const SIGNIN_URL = 'user/signin/';
export const SIGNOUT_URL = 'user/signout/';
export const SIGNUP_URL = 'user/signup/';
export const GET_USER_URL: (userId: string) => string = (userId: string) => `user/info/${userId}/`;
export const AUTO_COMPLETE_URL: (query: string) => string = (query: string) => `user/search/${query}/`;

export const GET_PROJECTS_URL: (userId: string) => string = (userId: string) => `project/${userId}`;
export const ADD_PROJECT_URL = 'project/m/';
export const GET_PROJECT_URL: (projectId: number) => string = (projectId: number) => `project/detail/${projectId}/`;

export const GET_TASKS_URL: (projectId: number) => string = (projectId: number) => `task/${projectId}/`;
export const ADD_TASK_URL: (projectId: number) => string = (projectId: number) => `task/${projectId}/m/`;
export const GET_TASK_URL: (taskId: number) => string = (taskId: number) => `task/detail/${taskId}/`;
