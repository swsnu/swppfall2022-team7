import { render } from '@testing-library/react';
import UserAvatar from './UserAvatar';

describe('<UserAvatar />', () => {
  let AD: JSX.Element;
  beforeAll(() => {
    global.matchMedia = global.matchMedia ?? function () {
      return {
        addListener: jest.fn(),
        removeListener: jest.fn()
      };
    };
  });
  it('should render without error w/ no image', () => {
    AD = <UserAvatar user={{ username: 'a' }} className='asdf' size='small'/>;
    render(AD);
  });
  it('should render without error', () => {
    AD = <UserAvatar user={{ username: 'a', image: 'asdf' }} className='asdf' size='small'/>;
    render(AD);
  });
});
