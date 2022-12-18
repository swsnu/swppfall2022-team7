import useBindStore from '@store/zustand';
import { act, fireEvent, render, screen } from '@testing-library/react';
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

jest.mock('../components/NewProjectCard.tsx', () => ()=> {
  return <div>newProjectCard</div>;
});

jest.mock('../components/ProjectCard.tsx', () => ()=> {
  return <div>ProjectCard</div>;
});

jest.mock('../components/MyTasks.tsx', () => ()=> {
  return <div>MyTasks</div>;
});

describe('<Home />', () => {
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
  };
  beforeAll(() => {
    AD = <Home />;
    global.matchMedia = global.matchMedia ?? function () {
      return {
        addListener: jest.fn(),
        removeListener: jest.fn()
      };
    };
  });
  it('should render', async () => {
    createMockLocalStorage({ userId: 'a' });
    axios.get = jest.fn().mockResolvedValue({ data: { project_list: [fakeProject1, fakeProject2] } });
    const i = useBindStore.getState();
    useBindStore.setState(i, true);
    await act(async () => { render(AD); });
  });
  it('should handle navigate to new project', async () => {
    createMockLocalStorage({ userId: 'a' });
    axios.get = jest.fn().mockResolvedValue({ data: { project_list: [fakeProject1, fakeProject2] } });
    const i = useBindStore.getState();
    i.projects = [fakeProject1, fakeProject2];
    useBindStore.setState(i, true);
    await act(async () => { render(AD); });
    const button = screen.getByRole('button');
    await act(async () => { fireEvent.click(button); });
  });
  it('should handle no userId', async () => {
    localStorage.clear();
    const i = useBindStore.getState();
    i.projects = [fakeProject1, fakeProject2];
    useBindStore.setState(i, true);
    await act(async () => { render(AD); });
  });
});
