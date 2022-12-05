import useBindStore from '@store/zustand';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { fakeTask1 } from '@utils/testDummy';
import axios from 'axios';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import StatusTag from './StatusTag';

describe('<StatusTag />', () => {
  let AD: JSX.Element;
  beforeAll(() => {
    global.matchMedia = global.matchMedia ?? function () {
      return {
        addListener: jest.fn(),
        removeListener: jest.fn()
      };
    };
  });
  it('should render on-going', async () => {
    AD = <MemoryRouter initialEntries={['/1']} ><Routes><Route element={<StatusTag status="on-going"/>} path='/:taskId'/></Routes></MemoryRouter>;
    axios.put = jest.fn();
    axios.get = jest.fn().mockResolvedValue({ data: fakeTask1 });
    render(AD);
    const tag = screen.getByText('On Going');
    fireEvent.click(tag);
    await waitFor(() => { expect(useBindStore.getState().selectedTask).toEqual(fakeTask1); });
  });
  it('should render done', async () => {
    AD = <MemoryRouter initialEntries={['/1']} ><Routes><Route element={<StatusTag status="done" />} path='/:taskId'/></Routes></MemoryRouter>;
    axios.put = jest.fn();
    axios.get = jest.fn().mockResolvedValue({ data: fakeTask1 });
    render(AD);
    const tag = screen.getByText('Done');
    fireEvent.click(tag);
    await waitFor(() => { expect(useBindStore.getState().selectedTask).toEqual(fakeTask1); });
  });
  it('should render without taskId', async () => {
    AD = <StatusTag status="done"/>;
    axios.put = jest.fn();
    axios.get = jest.fn().mockResolvedValue({ data: fakeTask1 });
    render(AD);
    const tag = screen.getByText('Done');
    fireEvent.click(tag);
    await waitFor(() => { expect(useBindStore.getState().selectedTask).toEqual(null); });
  });
});
