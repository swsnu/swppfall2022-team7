export const BASE_URL = 'https://api.swppsprint.site/';

export const SIGNIN_URL = 'user/signin/';
export const SIGNOUT_URL = 'user/signout/';
export const SIGNUP_URL = 'user/signup/';
export const GET_USER_URL: (userId: string) => string = (userId: string) => `user/info/${userId}/`;

export const GET_PROJECTS_URL: (userId: string) => string = (userId: string) => `project/${userId}`;
