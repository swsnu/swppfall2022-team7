export const BASE_URL = 'https://api.swppsprint.site/';

export const SIGNIN_URL = 'user/signin/';
export const SIGNOUT_URL = 'user/signout/';
export const SIGNUP_URL = 'user/signup/';
export const GET_USER_URL = (userId: string): string => `user/info/${userId}/`;
export const AUTO_COMPLETE_URL = (query: string): string => `user/search/${query}/`;

export const GET_NOTI_URL = 'user/noti/';
export const GET_NEW_NOTI_URL = 'user/noti/short/0/';

export const GET_PROJECTS_URL = (userId: string): string => `project/${userId}`;
export const ADD_PROJECT_URL = 'project/m/';
export const GET_PROJECT_URL = (projectId: number): string => `project/detail/${projectId}/`;
export const UPDATE_MEMBER_URL = (projectId: number, userId: number): string => `project/detail/${projectId}/member/${userId}/`;
export const UPDATE_PROJECT_URL = (projectId: number): string => `project/detail/${projectId}/m/`;

export const GET_TASKS_URL = (projectId: number): string => `task/${projectId}/`;
export const ADD_TASK_URL = (projectId: number): string => `task/${projectId}/m/`;
export const GET_TASK_URL = (taskId: number): string => `task/detail/${taskId}/`;
export const EDIT_TASK_URL = (taskId: number): string => `task/detail/${taskId}/m/`;
export const GET_USER_TASKS_URL = (userId: string): string => `task/belong/${userId}/`;

export const ADD_REACTION_URL = (commentId: number): string => `reaction/${commentId}/m/`;
export const ADD_COMMENT_URL = (taskId: number): string => `comment/${taskId}/m/`;
export const UPDATE_COMMENT_URL = (commentId: number): string => `comment/detail/${commentId}/m/`;

export const GET_DOC_SPACES_URL = (projectId: number): string => `document/${projectId}/`;
export const ADD_DOC_SPACES_URL = (projectId: number): string => `document/${projectId}/m/`;
export const GET_TASK_DOCS_URL = (taskId: number): string => `task/document/${taskId}/`;
export const LINK_TASK_DOC_URL = (taskId: number): string => `task/document/${taskId}/m/`;

export const GET_QUEST_URL = (projectId: number): string => `contribution/quest/${projectId}/`;
export const GET_TIMELINE_URL = (projectId: number): string => `contribution/timeline/${projectId}/`;

export const GET_DOC_ID_URL = (spaceId: number): string => `documents/${spaceId}/m/`;
