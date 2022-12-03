import { fireEvent, render, waitFor } from '@testing-library/react';
import { renderWithProviders } from '@utils/mocks';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';

const mockNavigate = jest.fn();
jest.mock('react-router', () => ({ ...jest.requireActual('react-router'), useNavigate: () => mockNavigate }));

describe('<Header />', () => {
  let AD: JSX.Element;
  function createMockLocalStorage(storage: any) {
    let localStorageMock = (function () {
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
        },
      };
    })();
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });
  }
  beforeAll(() => {
    AD = <MemoryRouter><Routes><Route path="" element={<Header />} /></Routes></MemoryRouter>;
    global.matchMedia = global.matchMedia ?? function () {
      return {
        addListener: jest.fn(),
        removeListener: jest.fn()
      };
    };
  });
  it('should handle logo click', async () => {
    createMockLocalStorage({ "token": "asdf" });
    const { container } = render(AD);
    const logo  = container.getElementsByClassName('header-logo')[0];
    fireEvent.click(logo);
    await waitFor(() => {expect(mockNavigate).toBeCalled()});
  });
  it('should handle token null', () => {
    createMockLocalStorage(null);
    render(AD);
  });
  it('should handle logout when no error', async () => {
    createMockLocalStorage({ "token": "asdf" });
    const { container } = render(AD);
    const noti = container.getElementsByClassName('bell-icon')[0];
    fireEvent.click(noti);
    const logout = container.getElementsByClassName('avatar')[0];
    axios.get = jest.fn(() => {throw new Error("error")});
    const mockLog = jest.spyOn(console, 'log').mockImplementation(() => {});
    fireEvent.click(logout);
    await waitFor(() => {expect(mockLog).toBeCalled()});
    axios.get = jest.fn().mockResolvedValueOnce(null);
    fireEvent.click(logout);
    await waitFor(() => {expect(mockNavigate).toBeCalled()});
  });
});
