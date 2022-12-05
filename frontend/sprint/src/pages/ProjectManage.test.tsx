import useBindStore from "@store/zustand";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { fakeProject1 } from "@utils/testDummy";
import axios from "axios";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ProjectManage from "./ProjectManage";

const mockNavigate = jest.fn();
jest.mock('react-router', () => ({ ...jest.requireActual('react-router'), useNavigate: () => mockNavigate }));

describe('<ProjectManage />', () => {
  let AD: JSX.Element;
  beforeAll(() => {
    AD = <MemoryRouter initialEntries={ ['/1'] }><Routes><Route element={<ProjectManage />} path='/:projectId' /></Routes></MemoryRouter>;
    global.matchMedia = global.matchMedia ?? function () {
      return {
        addListener: jest.fn(),
        removeListener: jest.fn()
      };
    };
  });
  it('should render without error', async () => {
    axios.delete = jest.fn();
    const i = useBindStore.getState();
    i.selectedProject = fakeProject1;
    useBindStore.setState(i, true);
    const { container } = render(AD);
    const addButton = screen.getAllByRole('button')[0];
    const dissolveButton = screen.getAllByRole('button')[1];
    fireEvent.click(dissolveButton);
    await waitFor(() => { expect(container.getElementsByClassName('dissolve-desc')[0]).toBeInTheDocument(); });
    const buttons = screen.getAllByRole('button');
    const di = screen.getByRole('textbox');
    fireEvent.change(di, { target: { value: 'a' } });
    await waitFor(() => { expect(buttons[4]).toBeEnabled() });
    fireEvent.click(buttons[4]);
    await waitFor(() => { expect(mockNavigate).toBeCalled(); });
  });
});