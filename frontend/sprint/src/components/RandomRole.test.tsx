import useBindStore from '@store/zustand';
import { ProjectType } from '@store/zustand/project';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import RandomRole from './RandomRole';

const mockSetModal = jest.fn();

const initialState: ProjectType = {
  document_number: 1,
  id: 1,
  last_modified: 'lm',
  manager: 1,
  member_list: [
    {
      email: 'a',
      id: 1,
      username: 'a'
    },
    {
      email: 'b',
      id: 2,
      username: 'b'
    },
    {
      email: 'c',
      id: 3,
      username: 'c'
    }
  ],
  name: 'na',
  subject: 'su',
  task_list: [
    {
      assignee: {
        email: 'a',
        id: 1,
        username: 'a'
      },
      content: 'con',
      createdAt: 'a',
      id: 1,
      name: 'a',
      project: 1,
      untilAt: 'a',
      updatedAt: 'a'
    }
  ]
};

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
    i.selectedProject = initialState;
    useBindStore.setState(i, true);
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
