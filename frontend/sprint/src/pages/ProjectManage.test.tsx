import useBindStore from "@store/zustand";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
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
    i.selectedProject = fakeProject3;
    useBindStore.setState(i, true);
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ projectId: '1' });
    const { container } = render(AD);
    await waitFor(() => { expect(container.getElementsByClassName('invite-email')[0]).not.toBeTruthy(); });;
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
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ projectId: '1' });
    const { container } = render(AD);
    await waitFor(() => { expect(container.getElementsByClassName('invite-email')[0]).not.toBeTruthy(); });
    axios.get = jest.fn().mockResolvedValueOnce({ data: [fakeUser1, fakeUser2] }).mockResolvedValueOnce({ data: [fakeUser2] }).mockResolvedValueOnce({ data: fakeProject3 });
    const addButton = screen.getByText('Add a new member');
    fireEvent.click(addButton);
    const emailInput = screen.getByRole('combobox');
    fireEvent.change(emailInput, { target: { value: 'asdf' } });
    await waitFor(() => { expect(axios.get).toBeCalled(); });
    await waitFor(() => { expect(screen.getAllByText('fakeUser2@fake.com')[1]).toBeTruthy(); });
    const optionButton = screen.getAllByText('fakeUser2@fake.com')[1];
    await act( async () => { fireEvent.click(optionButton); });
    const buttons = screen.getAllByRole('button');
    const inviteButton = buttons[3];
    fireEvent.click(inviteButton);
    axios.put = jest.fn();
    const confirmButton = buttons[5];
    axios.delete = jest.fn();
    await act( async () => { fireEvent.click(confirmButton); });
  });
  it('should handle member delete', async () => {
    axios.delete = jest.fn();
    axios.get = jest.fn().mockResolvedValueOnce({ data: { fakeProject1 } });
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ projectId: '1' });
    const i = useBindStore.getState();
    i.selectedProject = fakeProject1;
    useBindStore.setState(i, true);
    await act(async () => { render(AD); });
    const deletes = screen.getAllByText('delete');
    await act(async () => { fireEvent.click(deletes[0]); });
  });
  it('should handle cancel in add new memeber', async () => {
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ projectId: '1' });
    const i = useBindStore.getState();
    i.selectedProject = fakeProject1;
    useBindStore.setState(i, true);
    await act(async () => { render(AD); });
    const addButton = screen.getByText('Add a new member');
    fireEvent.click(addButton);
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[4]);
  });
  it('should handle cancel in dissolve', async () => {
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ projectId: '1' });
    const i = useBindStore.getState();
    i.selectedProject = fakeProject1;
    useBindStore.setState(i, true);
    await act(async () => { render(AD); });
    const dissolveButton = screen.getAllByRole('button')[1];
    fireEvent.click(dissolveButton);
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[3]);
  });
  it('should handle undefined projectId with add', async () => {
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ projectId: undefined });
    const i = useBindStore.getState();
    i.selectedProject = fakeProject3;
    useBindStore.setState(i, true);
    const { container } = render(AD);
    await waitFor(() => { expect(container.getElementsByClassName('invite-email')[0]).not.toBeTruthy(); });
    axios.get = jest.fn().mockResolvedValueOnce({ data: [fakeUser1, fakeUser2] }).mockResolvedValueOnce({ data: [fakeUser2] }).mockResolvedValueOnce({ data: fakeProject3 });
    const addButton = screen.getByText('Add a new member');
    fireEvent.click(addButton);
    const emailInput = screen.getByRole('combobox');
    fireEvent.change(emailInput, { target: { value: 'asdf' } });
    await waitFor(() => { expect(axios.get).toBeCalled(); });
    await waitFor(() => { expect(screen.getAllByText('fakeUser2@fake.com')[1]).toBeTruthy(); });
    const optionButton = screen.getAllByText('fakeUser2@fake.com')[1];
    await act( async () => { fireEvent.click(optionButton); });
    const buttons = screen.getAllByRole('button');
    const inviteButton = buttons[3];
    fireEvent.click(inviteButton);
    axios.put = jest.fn();
    const confirmButton = buttons[5];
    axios.delete = jest.fn();
    await act( async () => { fireEvent.click(confirmButton); });
  });
  it('should handle undefined projectId in dissolve', async () => {
    axios.delete = jest.fn();
    const i = useBindStore.getState();
    i.selectedProject = fakeProject3;
    useBindStore.setState(i, true);
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ projectId: undefined });
    await act(async () => { render(AD); });
    const dissolveButton = screen.getAllByRole('button')[1];
    await act(async () => { fireEvent.click(dissolveButton); });
    const buttons = screen.getAllByRole('button');
    const di = screen.getByRole('textbox');
    await act(async () => { fireEvent.change(di, { target: { value: 'a' } }); });
    await waitFor(() => { expect(buttons[4]).toBeEnabled() });
    await act(async () => { fireEvent.click(buttons[4]); });
  });
  it('should handle undefined projectId in delete', async () => {
    axios.delete = jest.fn();
    axios.get = jest.fn().mockResolvedValueOnce({ data: { fakeProject1 } });
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ projectId: undefined });
    const i = useBindStore.getState();
    i.selectedProject = fakeProject1;
    useBindStore.setState(i, true);
    await act(async () => { render(AD); });
    const deletes = screen.getAllByText('delete');
    await act(async () => { fireEvent.click(deletes[0]); });
  });
});