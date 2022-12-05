import useBindStore from "@store/zustand";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { fakeProject1, fakeProject3, fakeUser1, fakeUser2 } from "@utils/testDummy";
import axios from "axios";
import ProjectManage from "./ProjectManage";
import ReactRouter from 'react-router';

const mockNavigate = jest.fn();
jest.mock('react-router', () => ({ ...jest.requireActual('react-router'), useNavigate: () => mockNavigate }));

describe('<ProjectManage />', () => {
  let AD: JSX.Element;
  beforeAll(() => {
    AD = <ProjectManage />;
    global.matchMedia = global.matchMedia ?? function () {
      return {
        addListener: jest.fn(),
        removeListener: jest.fn()
      };
    };
  });
  it('should render without error/handle dissolve', async () => {
    axios.delete = jest.fn();
    const i = useBindStore.getState();
    i.selectedProject = fakeProject1;
    useBindStore.setState(i, true);
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ projectId: '1' });
    const { container } = render(AD);
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
  it('should handle add new member', async () => {
    const i = useBindStore.getState();
    i.selectedProject = fakeProject3;
    useBindStore.setState(i, true);
    axios.get = jest.fn().mockResolvedValue({ data: [fakeUser1, fakeUser2] });
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ projectId: '1' });
    render(AD);
    const addButton = screen.getByText('Add a new member');
    fireEvent.click(addButton);
    const emailInput = screen.getByRole('combobox');
    fireEvent.change(emailInput, { target: { value: 'asdf' } });
    await waitFor(() => { expect(screen.getAllByText('fakeUser2@fake.com')[0]).toBeInTheDocument(); });
    const optionButton = screen.getAllByText('fakeUser2@fake.com')[1];
    fireEvent.click(optionButton);
  });
});