import useBindStore from '@store/zustand';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { fakeProject1 } from '@utils/testDummy';
import axios from 'axios';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import RandomRole from './RandomRole';

const mockSetModal = jest.fn();

describe('<RandomRole />', () => {
  let AD: JSX.Element;
  beforeAll(() => {
    AD = <MemoryRouter initialEntries={['/1']}><Routes><Route path='/:projectId' element={<RandomRole randomIdList={[1]} setRandomIdList={() => {}} showModal={true} setShowModal={mockSetModal} />} /></Routes></MemoryRouter>;
    global.matchMedia = global.matchMedia ?? function () {
      return {
        addListener: jest.fn(),
        removeListener: jest.fn()
      };
    };
  });
  it('should render well', async () => {
    let i = useBindStore.getState();
    i.selectedProject = fakeProject1;
    useBindStore.setState(i, true);
    axios.put = jest.fn().mockResolvedValue(null);
    axios.get = jest.fn().mockResolvedValue({ data: fakeProject1 });
    render(AD);
    const checkbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(checkbox);
    const ok = screen.getAllByRole('button')[2];
    fireEvent.click(ok);
    await waitFor(() => { expect(mockSetModal).toBeCalled() });
    const cancel = screen.getAllByRole('button')[1];
    fireEvent.click(cancel);
    await waitFor(() => { expect(mockSetModal).toBeCalled() });
  });
  it('should render w/o projectId', () => {
    AD = <MemoryRouter initialEntries={['/dummy']}><Routes><Route path='/:project' element={<RandomRole randomIdList={[1]} setRandomIdList={() => {}} showModal={true} setShowModal={() => {}} />} /></Routes></MemoryRouter>;
    render(AD);
    const cancel = screen.getAllByRole('button')[1];
    fireEvent.click(cancel);
  });
});
