import { act, fireEvent, render, screen } from '@testing-library/react';
import axios from 'axios';
import TaskDetail from './TaskDetail';
import ReactRouter from 'react-router';
import useBindStore from '@store/zustand';
import { fakeProject1, fakeTask1 } from '@utils/testDummy';
import DocSpaceCollapse from '@components/DocSpaceCollapse';
import CommentBox from '@components/CommentBox';

const mockNavigate = jest.fn();
jest.mock('react-router', () => ({ ...jest.requireActual('react-router'), useNavigate: () => mockNavigate }));

jest.mock('../components/DocSpaceCollapse', () => () => {
  return <></>;
});
jest.mock('../components/CommentBox', () => () => {
  return <></>;
});

DocSpaceCollapse.displayName = 'docspacesollapse';
CommentBox.displayName = 'CommentBox';

describe('<DocUploader />', () => {
  let AD: JSX.Element;
  beforeAll(() => {
    AD = <TaskDetail />;
    global.matchMedia = global.matchMedia ?? function () {
      return {
        addListener: jest.fn(),
        removeListener: jest.fn()
      };
    };
  });
  it('should render without error', async () => {
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ projectId: '1', taskId: '1' });
    axios.get = jest.fn().mockResolvedValueOnce({ data: { username: 'a' } }).mockResolvedValueOnce({ data: { username: 'a' } });
    axios.post = jest.fn().mockResolvedValueOnce({ data: { id: 3 } });
    const i = useBindStore.getState();
    i.selectedProject = fakeProject1;
    i.selectedTask = fakeTask1;
    useBindStore.setState(i, true);
    render(AD);
    const buttons = screen.getAllByRole('button');
    await act(async () => { fireEvent.click(buttons[0]); });
    await act(async () => { fireEvent.click(screen.getAllByRole('button')[1]); });
    await act(async () => { fireEvent.click(buttons[0]); });
    const texts = screen.getAllByRole('textbox');
    axios.put = jest.fn();
    axios.get = jest.fn().mockResolvedValue({ data: fakeProject1 });
    await act(async () => { fireEvent.change(texts[0], { target: { value: 'test' } }); });
    await act(async () => { fireEvent.change(texts[1], { target: { value: 'test' } }); });
    await act(async () => { fireEvent.click(screen.getAllByRole('button')[0]); });
  });
  it('should delete', async () => {
    jest.spyOn(window, 'confirm').mockReturnValueOnce(false).mockReturnValueOnce(true).mockReturnValueOnce(true);
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ projectId: '1', taskId: '1' });
    jest.spyOn(console, 'log').mockImplementation(() => {});
    axios.get = jest.fn().mockResolvedValueOnce({ data: { username: 'a' } }).mockResolvedValueOnce({ data: { username: 'a' } });
    axios.post = jest.fn().mockResolvedValueOnce({ data: { id: 3 } });
    axios.delete = jest.fn();
    const i = useBindStore.getState();
    i.selectedProject = fakeProject1;
    i.selectedTask = fakeTask1;
    useBindStore.setState(i, true);
    render(AD);
    const b = screen.getAllByRole('button');
    await act(async () => { fireEvent.click(b[1]); });
    await act(async () => { fireEvent.click(b[1]); });
    axios.delete = jest.fn().mockImplementation(() => { throw new Error('testErrror'); });
    await act(async () => { fireEvent.click(b[1]); });
  });
});
