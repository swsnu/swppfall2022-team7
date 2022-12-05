import MyTask from './MyTasks';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import { fakeTask1, fakeTask2 } from '@utils/testDummy';
import useBindStore from '@store/zustand';

const mockNavigate = jest.fn();
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  Navigate: (props: any) => {
    mockNavigate(props.to);
    return null;
  },
  useNavigate: () => mockNavigate
}));

describe('<MyTask />', () => {
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
    AD = <MyTask />;
    global.matchMedia = global.matchMedia ?? function () {
      return {
        addListener: jest.fn(),
        removeListener: jest.fn()
      };
    };
  });
  it('should render my task', async () => {
    createMockLocalStorage({ userId: 1 });
    axios.get = jest.fn().mockResolvedValue({ data: [fakeTask1, fakeTask2] });
    render(AD);
    await waitFor(() => { expect(useBindStore.getState().userTasks).toEqual([fakeTask1, fakeTask2]); });
  });
  it('should handle task click', async () => {
    createMockLocalStorage({ userId: 1 });
    axios.get = jest.fn().mockResolvedValue({ data: [fakeTask1, fakeTask2] });
    render(AD);
    await waitFor(() => { expect(useBindStore.getState().userTasks).toEqual([fakeTask1, fakeTask2]); });
    const tab = screen.getAllByRole('tab')[1];
    fireEvent.click(tab);
    const task = screen.getByRole('listitem');
    fireEvent.click(task);
  });
});
