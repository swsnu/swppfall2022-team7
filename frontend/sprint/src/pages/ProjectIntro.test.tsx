import { fireEvent, screen } from '@testing-library/react';
import { choi, dummyProjects, ProjectType } from '@utils/testDummy';
import { renderWithProviders } from '@utils/mocks';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProjectIntro from './ProjectIntro';

const stubInitialState: ProjectType[] = dummyProjects;

const stubInitialState2: ProjectType[] = [{
  id: 1,
  updatedAt: '1 hour ago',
  description: 'test',
  documents: 0,
  name: 'Summary of Thousand Brains',
  subject: 'Scientific Tech and Writing',
  members: [choi],
  documentSpaces: [],
  tasks: [
    {
      name: 'Task 1',
      id: 1,
      updatedAt: '2 days ago',
      members: [],
      description: 'Description 1',
      documentSpaces: [
        {
          name: 'Space 1',
          updatedAt: '1 hour ago',
          id: 1
        },
        {
          name: 'Space 2',
          updatedAt: '2022.10.25',
          id: 2
        }
      ]
    },
    {
      name: 'Task 2',
      id: 2,
      updatedAt: '1 hour ago',
      members: [],
      description: 'Description 2',
      documentSpaces: [
        {
          name: 'Space 2',
          updatedAt: '2022.10.25',
          id: 2
        },
        {
          name: 'Space 3',
          updatedAt: '2022.10.23',
          id: 3
        }
      ]
    }
  ]
}];

const mockState = {
  preloadedState: {
    project: stubInitialState
  }
};

const mockState2 = {
  preloadedState: {
    project: stubInitialState2
  }
};

describe('project intro test', () => {
  let AD: JSX.Element;
  beforeAll(() => {
    AD = <MemoryRouter initialEntries={['/1']}><Routes><Route path='/:projectId' element={<ProjectIntro />} /></Routes></MemoryRouter>;
    global.matchMedia = global.matchMedia ?? function () {
      return {
        addListener: jest.fn(),
        removeListener: jest.fn()
      };
    };
  });
  it('should render with link of space', () => {
    const { container } = renderWithProviders(AD, mockState);
    const space = container.getElementsByClassName('link')[1];
    fireEvent.click(space);
  });
  it('should render with link of task', () => {
    const { container } = renderWithProviders(AD, mockState);
    const task = container.getElementsByClassName('link')[2];
    fireEvent.click(task);
  });
  it('should render w/o projectId', () => {
    AD = <MemoryRouter initialEntries={['/1']}><Routes><Route path='/:project' element={<ProjectIntro />} /></Routes></MemoryRouter>;
    renderWithProviders(AD, mockState);
  });
  it('should handle checkbox click', () => {
    AD = <MemoryRouter initialEntries={['/1']}><Routes><Route path='/:projectId' element={<ProjectIntro />} /></Routes></MemoryRouter>;
    renderWithProviders(AD, mockState2);
    const checkbox = screen.getAllByRole('checkbox')[2];
    fireEvent.click(checkbox);
    const button = screen.getAllByRole('button')[0];
    fireEvent.click(button);
  });
});
