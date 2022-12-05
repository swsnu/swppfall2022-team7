import { render } from '@testing-library/react';
import UserCard from './UserCard';

describe('UserCard test', () => {
  let AD: JSX.Element;
  beforeAll(() => {
    AD = <UserCard user={{ email: 'e', username: 'a' }}/>;
    global.matchMedia = global.matchMedia ?? function () {
      return {
        addListener: jest.fn(),
        removeListener: jest.fn()
      };
    };
  });
  it('should render without error', () => {
    render(AD);
  });
});
