import { AUTO_COMPLETE_URL, BASE_URL, SIGNIN_URL, SIGNOUT_URL, SIGNUP_URL } from './api';

describe('check BASE_URL', () => {
  it('test urls', () => {
    expect(BASE_URL).toBe('https://api.swppsprint.site/');
    expect(SIGNIN_URL).toBe('user/signin/');
    expect(SIGNOUT_URL).toBe('user/signout/');
    expect(SIGNUP_URL).toBe('user/signup/');
    expect(AUTO_COMPLETE_URL('asdf', 1)).toBe('user/search/1/asdf');
    expect(AUTO_COMPLETE_URL('asdf')).toBe('user/search/asdf/');
  });
});
