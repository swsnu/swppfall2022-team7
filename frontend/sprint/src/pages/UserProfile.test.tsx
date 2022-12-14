import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
import useBindStore from '@store/zustand';
import { fakeUser1 } from '@utils/testDummy';
import UserProfile from './UserProfile';
import userEvent from '@testing-library/user-event';

const mockNavigate = jest.fn();
jest.mock('react-router', () => ({ ...jest.requireActual('react-router'), useNavigate: () => mockNavigate }));

describe('<UserProfile />', () => {
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
    AD = <UserProfile />;
    global.matchMedia = global.matchMedia ?? function () {
      return {
        addListener: jest.fn(),
        removeListener: jest.fn()
      };
    };
  });
  it('should render when no user', async () => {
    render(AD);
  });
  it('should handle file upload, change name, click save', async () => {
    createMockLocalStorage({ userId: 'a' });
    axios.post = jest.fn();
    axios.put = jest.fn();
    axios.get = jest.fn().mockResolvedValue({ data: fakeUser1 });
    const i = useBindStore.getState();
    i.user = fakeUser1;
    useBindStore.setState(i, true);
    const { container } = render(AD);
    const file = new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" });
    const upload = container.getElementsByTagName('input')[0];
    await act(async () => { userEvent.upload(upload, file); });
    const username = container.getElementsByTagName('input')[1];
    await act(async () => { fireEvent.change(username, { target: { value: 'testedittedname' } }); });
    const save = screen.getAllByRole('button')[2];
    await act(async () => { fireEvent.click(save); });
  });
  it('should handle delete image', async () => {
    createMockLocalStorage({ userId: 'a' });
    axios.delete = jest.fn();
    axios.get = jest.fn().mockResolvedValue({ data: fakeUser1 });
    const i = useBindStore.getState();
    i.user = fakeUser1;
    useBindStore.setState(i, true);
    render(AD);
    const deleteButton = screen.getAllByRole('button')[1];
    await act(async () => { fireEvent.click(deleteButton); });
  });
  it('should handle not image file error', async () => {
    createMockLocalStorage({ userId: 'a' });
    axios.post = jest.fn();
    axios.put = jest.fn();
    axios.get = jest.fn().mockResolvedValue({ data: fakeUser1 });
    const i = useBindStore.getState();
    i.user = fakeUser1;
    useBindStore.setState(i, true);
    const { container } = render(AD);
    const file = new File(["(⌐□_□)"], "chucknorris", { type: "asdf" });
    const upload = container.getElementsByTagName('input')[0];
    await act(async () => { userEvent.upload(upload, file); });
  });
});
