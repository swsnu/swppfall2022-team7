import { act, render } from '@testing-library/react';
import ReactRouter, { MemoryRouter, Route, Routes } from 'react-router';
import PrivateRoute from './PrivateRoute';

import useBindStore from '@store/zustand';
import { fakeProject1, fakeUser1 } from '@utils/testDummy';
import axios from 'axios';

const mockNavigate = jest.fn();
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  Navigate: (props: any) => {
    mockNavigate(props.to);
    return null;
  },
  useNavigate: () => mockNavigate
}));

describe('<PrivateRoute />', () => {
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
  let AD: JSX.Element;
  beforeAll(() => {
    AD = <MemoryRouter initialEntries={['/']}><Routes><Route path='/' element={<PrivateRoute />} /></Routes></MemoryRouter>;
    global.matchMedia = global.matchMedia ?? function () {
      return {
        addListener: jest.fn(),
        removeListener: jest.fn()
      };
    };
  });
  it('should render without render', () => {
    render(AD);
  });
  it('if exists token', async () => {
    createMockLocalStorage({ token: 'asdf' });
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ projectId: '1' });
    axios.get = jest.fn().mockResolvedValue({ data: { project_list: [fakeProject1] } });
    const i = useBindStore.getState();
    i.user = fakeUser1;
    useBindStore.setState(i, true);
    await act(async () => { render(AD); });
  });
  it('if exists token', async () => {
    createMockLocalStorage({ token: 'asdf' });
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ projectId: 'a' });
    axios.get = jest.fn().mockResolvedValue({ data: { project_list: [fakeProject1] } });
    const i = useBindStore.getState();
    i.user = fakeUser1;
    useBindStore.setState(i, true);
    await act(async () => { render(AD); });
  });
});
