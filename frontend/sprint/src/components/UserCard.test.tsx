import { act, fireEvent, render, screen } from '@testing-library/react';
import UserCard from './UserCard';

describe('<UserCard />', () => {
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
  it('should render without error', async () => {
    render(AD);
    const b = screen.getByText('a');
    await act(async () => { fireEvent.click(b); });
  });
});
