import useBindStore from "@store/zustand";
import { fakeComment1, fakeComment2, fakeTask1, fakeUser1 } from "@utils/testDummy";
import CommentBox from "./CommentBox";
import ReactRouter from 'react-router';
import { act, fireEvent, render, screen } from "@testing-library/react";
import axios from "axios";

const mockNavigate = jest.fn();
jest.mock('react-router', () => ({ ...jest.requireActual('react-router'), useNavigate: () => mockNavigate }));

describe('<CommentBox />', () => {
  let AD: JSX.Element;
  beforeAll(() => {
    AD = <CommentBox commentList={[fakeComment1, fakeComment2]} />;
    global.matchMedia = global.matchMedia ?? function () {
      return {
        addListener: jest.fn(),
        removeListener: jest.fn()
      };
    };
  });
  it('should render without error', async () => {
    const i = useBindStore.getState();
    i.user = fakeUser1;
    useBindStore.setState(i, true);
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ taskId: '1' });
    await act(async () => { render(AD); });
  });
  it('should render without error with no user', async () => {
    const i = useBindStore.getState();
    i.user = null;
    useBindStore.setState(i, true);
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ taskId: '1' });
    await act(async () => { render(AD); });
  });
  it('should handle delete without error', async () => {
    const i = useBindStore.getState();
    i.user = fakeUser1;
    useBindStore.setState(i, true);
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ taskId: '1' });
    axios.delete = jest.fn();
    axios.get = jest.fn().mockResolvedValue({ data: fakeTask1 });
    await act(async () => { render(AD); });
    window.confirm = jest.fn().mockReturnValue(true);
    const deleteButton = screen.getByText('Delete');
    await act(async () => { fireEvent.click(deleteButton); });
  });
  it('should handle delete with window reject', async () => {
    const i = useBindStore.getState();
    i.user = fakeUser1;
    useBindStore.setState(i, true);
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ taskId: '1' });
    axios.delete = jest.fn();
    axios.get = jest.fn().mockResolvedValue({ data: fakeTask1 });
    await act(async () => { render(AD); });
    window.confirm = jest.fn().mockReturnValue(false);
    const deleteButton = screen.getByText('Delete');
    await act(async () => { fireEvent.click(deleteButton); });
  });
  it('should handle submit new comment', async () => {
    const i = useBindStore.getState();
    i.user = fakeUser1;
    useBindStore.setState(i, true);
    axios.post = jest.fn();
    axios.get = jest.fn().mockResolvedValue({ data: fakeTask1 });
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ taskId: '1' });
    await act(async () => { render(AD); });
    const newComment = screen.getByRole('textbox');
    await act(async () => { fireEvent.change(newComment, { target: { value: 'newTestComment' } }); });
    const submitButton = screen.getByRole('button');
    await act(async () => { fireEvent.click(submitButton); });
  });
  it('should handle delete with no taskId', async () => {
    const i = useBindStore.getState();
    i.user = fakeUser1;
    useBindStore.setState(i, true);
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ taskId: undefined });
    axios.delete = jest.fn();
    axios.get = jest.fn().mockResolvedValue({ data: fakeTask1 });
    await act(async () => { render(AD); });
    window.confirm = jest.fn().mockReturnValue(true);
    const deleteButton = screen.getByText('Delete');
    await act(async () => { fireEvent.click(deleteButton); });
  });
  it('should handle submit new comment', async () => {
    const i = useBindStore.getState();
    i.user = fakeUser1;
    useBindStore.setState(i, true);
    axios.post = jest.fn();
    axios.get = jest.fn().mockResolvedValue({ data: fakeTask1 });
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ taskId: undefined });
    await act(async () => { render(AD); });
    const newComment = screen.getByRole('textbox');
    await act(async () => { fireEvent.change(newComment, { target: { value: 'newTestComment' } }); });
    const submitButton = screen.getByRole('button');
    await act(async () => { fireEvent.click(submitButton); });
  });
});