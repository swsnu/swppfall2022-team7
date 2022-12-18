
import { fireEvent, render, screen } from '@testing-library/react';
import { fakeUser1 } from '@utils/testDummy';
import useBindStore from '@store/zustand';
import ProfileModal from './ProfileModal';
import { act } from 'react-dom/test-utils';

const mockNavigate = jest.fn();
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  Navigate: (props: any) => {
    mockNavigate(props.to);
    return null;
  },
  useNavigate: () => mockNavigate
}));

describe('<ProfileModal />', () => {
  let AD: JSX.Element;
  beforeAll(() => {
    AD = <ProfileModal />;
    global.matchMedia = global.matchMedia ?? function () {
      return {
        addListener: jest.fn(),
        removeListener: jest.fn()
      };
    };
  });
  it('should render without render', async () => {
    const i = useBindStore.getState();
    i.selectedUser = fakeUser1;
    i.showProfileModal = true;
    useBindStore.setState(i, true);
    render(AD);
  });
  it('should handle cancel', async () => {
    const i = useBindStore.getState();
    i.selectedUser = fakeUser1;
    i.showProfileModal = true;
    useBindStore.setState(i, true);
    render(AD);
    const cancelB = screen.getByRole('button');
    await act(async () => { fireEvent.click(cancelB); });
  });
});
