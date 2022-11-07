import { fireEvent, screen } from '@testing-library/react';
import { choi, ProjectType } from '@utils/dummy';
import { renderWithProviders } from '@utils/mocks';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import RandomRole from './RandomRole';

const stubInitialState: ProjectType[] = [{
  id: 1,
  updatedAt: '1 hour ago',
  description: 'test',
  documents: 0,
  name: 'test',
  subject: 'test',
  members: [choi],
  documentSpaces: [],
  tasks: [{
    name: 'Task 1',
    id: 1,
    updatedAt: '2 days ago',
    members: [],
    description: 'Description 1',
    documentSpaces: [],
    comments: [],
    dueDate: '',
    status: ''
  }]
}];

const mockState = {
  preloadedState: {
    project: stubInitialState
  }
};

describe('<RandomRole />', () => {
  let AD: JSX.Element;
  beforeAll(() => {
    AD = <MemoryRouter initialEntries={['/1']}><Routes><Route path='/:projectId' element={<RandomRole randomIdList={[1]} setRandomIdList={() => {}} showModal={true} setShowModal={() => {}} />} /></Routes></MemoryRouter>;
    global.matchMedia = global.matchMedia ?? function () {
      return {
        addListener: jest.fn(),
        removeListener: jest.fn()
      };
    };
  });
  it('should render well', () => {
    renderWithProviders(AD, mockState);
    const cancel = screen.getAllByRole('button')[1];
    fireEvent.click(cancel);
    const checkbox = screen.getAllByRole('checkbox')[1];
    fireEvent.click(checkbox);
    const ok = screen.getAllByRole('button')[2];
    fireEvent.click(ok);
  });
  it('should render w/o projectId', () => {
    AD = <MemoryRouter initialEntries={['/dummy']}><Routes><Route path='/:project' element={<RandomRole randomIdList={[1]} setRandomIdList={() => {}} showModal={true} setShowModal={() => {}} />} /></Routes></MemoryRouter>;
    renderWithProviders(AD, mockState);
    const ok = screen.getAllByRole('button')[2];
    fireEvent.click(ok);
  });
});
