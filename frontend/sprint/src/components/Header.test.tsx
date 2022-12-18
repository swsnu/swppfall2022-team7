import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import { act } from 'react-dom/test-utils';
import useBindStore from '@store/zustand';
import { fakeUser1 } from '@utils/testDummy';
import Notification from './Notification';

jest.mock('./Notification', () => () => {
  return <div>Noti</div>;
});

Notification.displayName = 'asdf';

const mockNavigate = jest.fn();
jest.mock('react-router', () => ({ ...jest.requireActual('react-router'), useNavigate: () => mockNavigate }));

describe('<Header />', () => {
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
    AD = <MemoryRouter><Routes><Route path='' element={<Header />} /></Routes></MemoryRouter>;
    global.matchMedia = global.matchMedia ?? function () {
      return {
        addListener: jest.fn(),
        removeListener: jest.fn()
      };
    };
  });
  it('should handle logo click', async () => {
    axios.get = jest.fn().mockResolvedValue({ data: { new_notification_num: 5 } });
    createMockLocalStorage({ token: 'asdf' });
    await act(async () => { render(AD); });
    const logo = screen.getByText('Sprint');
    fireEvent.click(logo);
    await waitFor(() => { expect(mockNavigate).toBeCalled(); });
  });
  it('should handle token null', async () => {
    axios.get = jest.fn().mockResolvedValue({ data: { new_notification_num: 5 } });
    createMockLocalStorage({ token: null });
    await act(async () => { render(AD); });
  });
  it('should handle noti', async () => {
    createMockLocalStorage({ token: 'asdf' });
    axios.get = jest.fn().mockResolvedValue({ data: { new_notification_num: 5 } });
    await act(() => { render(AD); });
    const button = screen.getByRole('button');
    await act(async () => { fireEvent.click(button); });
    const nbutton = screen.getByRole('button');
    await act(async () => { fireEvent.click(button); });
  });
  it('should handle noti when no noti', async () => {
    createMockLocalStorage({ token: 'asdf' });
    axios.get = jest.fn().mockResolvedValue({ data: { new_notification_num: 0 } });
    await act(() => { render(AD); });
    const button = screen.getByRole('button');
    await act(async () => { fireEvent.click(button); });
  });
  it('should handle userMenu', async () => {
    createMockLocalStorage({ token: 'asdf' });
    axios.get = jest.fn().mockResolvedValueOnce({ data: { new_notification_num: 0 } });
    const i = useBindStore.getState();
    i.user = fakeUser1;
    useBindStore.setState(i, true);
    await act(() => { render(AD); });
    const user = screen.getByText('F');
    await act(async () => { fireEvent.click(user); });
    const buttons = screen.getAllByRole('button');
    await act(async () => { fireEvent.click(buttons[1]); });
    await act(async () => { fireEvent.click(buttons[2]); });
  });
});
