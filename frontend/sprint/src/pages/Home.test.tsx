import useBindStore from '@store/zustand';
import { fireEvent, render, screen } from '@testing-library/react';
import { renderWithProviders } from '@utils/mocks';
import { fakeProject1, fakeProject2 } from '@utils/testDummy';
import axios from 'axios';
import Home from './Home';

const mockNavigate = jest.fn();
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  Navigate: (props: any) => {
    mockNavigate(props.to);
    return null;
  },
  useNavigate: () => mockNavigate
}));

describe('<Home />', () => {
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
  };
  beforeAll(() => {
    global.matchMedia = global.matchMedia ?? function () {
      return {
        addListener: jest.fn(),
        removeListener: jest.fn()
      };
    };
  });
  it('should render', () => {
    createMockLocalStorage({ userId: 'a' });
    axios.get = jest.fn().mockResolvedValue({ data: [fakeProject1, fakeProject2] });
    const AD = <Home />;
    const i = useBindStore.getState();
    i.selectedProject = fakeProject1;
    useBindStore.setState(i, true);
    render(AD);
  });
});
