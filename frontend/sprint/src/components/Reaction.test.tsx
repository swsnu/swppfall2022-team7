
import { fireEvent, render, waitFor } from '@testing-library/react';
import axios from 'axios';
import { fakeReaction1, fakeReaction2, fakeReaction3, fakeReaction4, fakeTask1, fakeTask2, fakeUser1 } from '@utils/testDummy';
import useBindStore from '@store/zustand';
import { act } from 'react-dom/test-utils';
import ReactRouter from 'react-router';
import Reaction from './Reaction';

const mockNavigate = jest.fn();
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  Navigate: (props: any) => {
    mockNavigate(props.to);
    return null;
  },
  useNavigate: () => mockNavigate
}));

describe('<Reaction />', () => {
  let AD: JSX.Element;
  function createMockLocalStorage (storage: any): void {
    const localStorageMock = (function () {
      let store: any = storage;
      return {
        getItem: function (key: string) {
          return store[key] ?? null;
        },
        setItem: function (key: string, value: string) {
          store[key] = value.toString();
        },
        clear: function () {
          store = {};
        }
      };
    })();
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock
    });
  }
  beforeAll(() => {
    global.matchMedia = global.matchMedia ?? function () {
      return {
        addListener: jest.fn(),
        removeListener: jest.fn()
      };
    };
  });
  it('should render without error', async () => {
    AD = <Reaction commentId={1} reactionList={[fakeReaction1, fakeReaction2, fakeReaction3, fakeReaction4]} />;
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ taskId: '1' });
    createMockLocalStorage({ userId: '1' });
    const i = useBindStore.getState();
    i.selectedUser = fakeUser1;
    i.showProfileModal = true;
    useBindStore.setState(i, true);
    await act(async () => { render(AD); });
  });
  it('should render without error w/ empty reaction list', async () => {
    AD = <Reaction commentId={1} reactionList={[]} />;
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ taskId: '1' });
    axios.post = jest.fn();
    axios.get = jest.fn().mockResolvedValue({ data: fakeTask1 });
    createMockLocalStorage({ userId: '1' });
    const i = useBindStore.getState();
    i.selectedUser = fakeUser1;
    i.showProfileModal = true;
    useBindStore.setState(i, true);
    const { container } = render(AD);
    await waitFor(() => { expect(container.getElementsByClassName('ant-tag')[0]).toBeInTheDocument(); });
    const tags = container.getElementsByClassName('ant-tag');
    await act(async () => { fireEvent.click(tags[0]); });
  });
  it('should handle tag click', async () => {
    AD = <Reaction commentId={1} reactionList={[fakeReaction1, fakeReaction2, fakeReaction3]} />;
    axios.post = jest.fn();
    axios.get = jest.fn().mockResolvedValue({ data: fakeTask1 });
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ taskId: '1' });
    createMockLocalStorage({ userId: '1' });
    const i = useBindStore.getState();
    i.selectedUser = fakeUser1;
    i.showProfileModal = true;
    useBindStore.setState(i, true);
    const { container } = render(AD);
    await waitFor(() => { expect(container.getElementsByClassName('ant-tag')[0]).toBeInTheDocument(); });
    const tags = container.getElementsByClassName('ant-tag');
    await act(async () => { fireEvent.click(tags[0]); });
  });
  it('should render without error w/ empty reaction list', async () => {
    AD = <Reaction commentId={1} reactionList={[]} />;
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ taskId: undefined });
    axios.post = jest.fn();
    axios.get = jest.fn().mockResolvedValue({ data: fakeTask1 });
    createMockLocalStorage({ userId: '1' });
    const i = useBindStore.getState();
    i.selectedUser = fakeUser1;
    i.showProfileModal = true;
    useBindStore.setState(i, true);
    const { container } = render(AD);
    await waitFor(() => { expect(container.getElementsByClassName('ant-tag')[0]).toBeInTheDocument(); });
    const tags = container.getElementsByClassName('ant-tag');
    await act(async () => { fireEvent.click(tags[0]); });
  });
});
