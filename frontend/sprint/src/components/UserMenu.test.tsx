import useBindStore from "@store/zustand";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { fakeUser1 } from "@utils/testDummy";
import axios from "axios";
import UserMenu from "./UserMenu";

const mockNavigate = jest.fn();
jest.mock('react-router', () => ({ ...jest.requireActual('react-router'), useNavigate: () => mockNavigate }));

describe('<UserMenu />', () => {
  let AD: JSX.Element;
  beforeAll(() => {
    AD = <UserMenu />;
    jest.spyOn(console, 'error').mockImplementation(() => {});
    global.matchMedia = global.matchMedia ?? function () {
      return {
        addListener: jest.fn(),
        removeListener: jest.fn()
      };
    };
  });
  it('should render', async () => {
    const i = useBindStore.getState();
    i.user = fakeUser1;
    useBindStore.setState(i, true);
    render(AD);
  });
  it('should handle logout', async () => {
    axios.get = jest.fn();
    const i = useBindStore.getState();
    i.user = fakeUser1;
    useBindStore.setState(i, true);
    render(AD);
    const logout = screen.getByRole('button');
    await act(async () => { fireEvent.click(logout); });
  });
  it('should handle logout error', async () => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    axios.get = jest.fn().mockImplementation(() => { throw new Error('testError') });;
    const i = useBindStore.getState();
    i.user = fakeUser1;
    useBindStore.setState(i, true);
    render(AD);
    const logout = screen.getByRole('button');
    await act(async () => { fireEvent.click(logout); });
  });
  it('should handle logout error', async () => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    axios.get = jest.fn().mockImplementation(() => { throw new Error('testError') });;
    const i = useBindStore.getState();
    i.user = null;
    useBindStore.setState(i, true);
    render(AD);
  });
});
