import DocUploader from './DocUploader';
import { fakeDocumentSpaceCard1, fakeProject1, fakeTask1 } from '@utils/testDummy';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import userEvent from '@testing-library/user-event';
import useBindStore from '@store/zustand';

describe('<DocUploader />', () => {
  let AD: JSX.Element;
  beforeAll(() => {
    jest.useFakeTimers();
    AD = <DocUploader documentSpace={fakeDocumentSpaceCard1} />;
    global.matchMedia = global.matchMedia ?? function () {
      return {
        addListener: jest.fn(),
        removeListener: jest.fn()
      };
    };
  });
  it('should render without error', async () => {
    const i = useBindStore.getState();
    i.selectedTask = fakeTask1;
    i.selectedProject = fakeProject1;
    useBindStore.setState(i, true);
    axios.get = jest.fn().mockResolvedValueOnce({ data: { username: 'a' } }).mockResolvedValueOnce({ data: { username: 'a' } }).mockResolvedValueOnce({ data: { username: 'a' } });
    axios.post = jest.fn().mockResolvedValueOnce({ data: { id: 3 } });
    const { container } = render(AD);
    await waitFor(() => { expect(screen.getByRole('tab')).toBeTruthy(); });
    const tab = screen.getByRole('tab');
    await act(async () => { fireEvent.click(tab); });
    const uploader = container.getElementsByTagName('input');
    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
    await act(async () => { userEvent.upload(uploader[0], file); });
    const remove = screen.getAllByRole('button')[1];
    await act(async () => { fireEvent.click(remove); });
    await act(async () => { userEvent.upload(uploader[0], file); });
    const upload = screen.getAllByRole('button')[2];
    await act(async () => { fireEvent.click(upload); });
    await act(async () => { jest.advanceTimersByTime(20000); });
  });
});
