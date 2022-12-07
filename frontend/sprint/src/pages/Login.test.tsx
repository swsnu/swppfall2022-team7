import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { fakeUser1 } from '@utils/testDummy';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';

const mockNavigate = jest.fn();
jest.mock('react-router', () => ({ ...jest.requireActual('react-router'), useNavigate: () => mockNavigate }));

describe('test Login page', () => {
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
  let AD: JSX.Element;
  beforeAll(() => {
    AD = <MemoryRouter><Login /></MemoryRouter>;
  });
  it('should handle login success', async () => {
    axios.post = jest.fn().mockResolvedValue({ data: { token: "1", ...fakeUser1 } });
    localStorage.setItem = jest.fn();
    createMockLocalStorage({ token: "a" });
    render(AD);
    const email = screen.getByPlaceholderText('Example@snu.ac.kr');
    const password = screen.getByPlaceholderText('Password');
    fireEvent.change(email, { target: { value: 'testemail' } });
    fireEvent.change(password, { target: { value: 'testpassword' } });
    fireEvent.keyPress(password, { key: 'p', code: 112, charCode: 112 });
    await act(async () => { fireEvent.click(screen.getByRole('button')); });
    await waitFor(() => { expect(mockNavigate).toBeCalled(); });
  });
  it('should handle login failed', async () => {
    axios.post = jest.fn().mockResolvedValue({ data: { token: null, user: fakeUser1 } });
    createMockLocalStorage({ token: null });
    render(AD);
    const email = screen.getByPlaceholderText('Example@snu.ac.kr');
    const password = screen.getByPlaceholderText('Password');
    fireEvent.change(email, { target: { value: 'testemail' } });
    fireEvent.change(password, { target: { value: 'testpassword' } });
    fireEvent.keyPress(password, { key: 'p', code: 112, charCode: 112 });
    await act(async () => { fireEvent.keyPress(password, { key: 'Enter', code: 13, charCode: 13 }); });
  });
});
