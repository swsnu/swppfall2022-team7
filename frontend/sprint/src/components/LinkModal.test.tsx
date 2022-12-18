import { fireEvent, render, screen } from '@testing-library/react';
import axios from 'axios';
import { fakeDocumentSpace1, fakeDocumentSpace2, fakeTask1 } from '@utils/testDummy';
import useBindStore from '@store/zustand';
import { act } from 'react-dom/test-utils';
import LinkModal from './LinkModal';
import ReactRouter from 'react-router';

const mockNavigate = jest.fn();
jest.mock('react-router', () => ({ ...jest.requireActual('react-router'), useNavigate: () => mockNavigate }));

describe('<ProjectDocument />', () => {
  let AD: JSX.Element;
  beforeAll(() => {
    jest.useFakeTimers();
    AD = <LinkModal setShowLinkModal={jest.fn()} showLinkModal={true}/>;
    global.matchMedia = global.matchMedia ?? function () {
      return {
        addListener: jest.fn(),
        removeListener: jest.fn()
      };
    };
  });
  it('should render', async () => {
    const i = useBindStore.getState();
    i.documentSpaces = [fakeDocumentSpace1, fakeDocumentSpace2];
    i.taskSpaces = [fakeDocumentSpace1];
    useBindStore.setState(i, true);
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ projectId: '1', taskId: '1' });
    axios.get = jest.fn().mockResolvedValueOnce({ data: [fakeDocumentSpace1, fakeDocumentSpace2] }).mockResolvedValueOnce({ data: [fakeDocumentSpace1] }).mockResolvedValueOnce({ data: fakeTask1 });
    axios.delete = jest.fn();
    axios.post = jest.fn();
    await act(async () => { render(AD); });
    const selectDocumentSpace = screen.getAllByRole('checkbox');
    await act(async () => { fireEvent.click(selectDocumentSpace[1]); });
    await act(async () => { fireEvent.click(selectDocumentSpace[2]); });
    const cancelbutton = screen.getAllByRole('button')[1];
    const okbutton = screen.getAllByRole('button')[2];
    await act(async () => { fireEvent.click(cancelbutton); });
    await act(async () => { fireEvent.click(okbutton); });
  });
  it('should render w/ no taskId, projectId', async () => {
    const i = useBindStore.getState();
    i.documentSpaces = [fakeDocumentSpace1, fakeDocumentSpace2];
    i.taskSpaces = [fakeDocumentSpace1];
    useBindStore.setState(i, true);
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ projectId: undefined, taskId: undefined });
    axios.get = jest.fn().mockResolvedValueOnce({ data: [fakeDocumentSpace1, fakeDocumentSpace2] }).mockResolvedValueOnce({ data: [fakeDocumentSpace1] }).mockResolvedValueOnce({ data: fakeTask1 });
    axios.delete = jest.fn();
    axios.post = jest.fn();
    await act(async () => { render(AD); });
    const selectDocumentSpace = screen.getAllByRole('checkbox');
    await act(async () => { fireEvent.click(selectDocumentSpace[1]); });
    await act(async () => { fireEvent.click(selectDocumentSpace[2]); });
    const cancelbutton = screen.getAllByRole('button')[1];
    const okbutton = screen.getAllByRole('button')[2];
    await act(async () => { fireEvent.click(cancelbutton); });
    await act(async () => { fireEvent.click(okbutton); });
  });
});
