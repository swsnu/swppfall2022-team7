import useBindStore from '@store/zustand';
import { fireEvent, render, screen } from '@testing-library/react';
import { fakeNoti1, fakeNoti2 } from '@utils/testDummy';
import { act } from 'react-dom/test-utils';
import Notification from './Notification';

const mockNavigate = jest.fn();
jest.mock('react-router', () => ({ ...jest.requireActual('react-router'), useNavigate: () => mockNavigate }));

describe('<Notification />', () => {
  let AD: JSX.Element;
  beforeAll(() => {
    AD = <Notification />;
    global.matchMedia = global.matchMedia ?? function () {
      return {
        addListener: jest.fn(),
        removeListener: jest.fn()
      };
    };
  });
  it('should render without noti', () => {
    const i = useBindStore.getState();
    i.noti = null;
    useBindStore.setState(i, true);
    render(<Notification />);
  });
  it('should render with notis', () => {
    const i = useBindStore.getState();
    i.noti = [fakeNoti1, fakeNoti2];
    useBindStore.setState(i, true);
    render(<Notification />);
  });
  it('should handle noti click', async () => {
    const i = useBindStore.getState();
    i.noti = [fakeNoti1, fakeNoti2];
    useBindStore.setState(i, true);
    render(<Notification />);
    const noti = screen.getAllByRole('listitem');
    await act(async () => { fireEvent.click(noti[0]); });
  });
});
