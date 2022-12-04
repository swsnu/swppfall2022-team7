import { ProjectType } from '@store/zustand/project';
import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProjectCard from './ProjectCard';

const mockNavigate = jest.fn();
jest.mock('react-router', () => ({ ...jest.requireActual('react-router'), useNavigate: () => mockNavigate }));

const p: ProjectType = {
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

const mp: ProjectType = {
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
    },
    {
      email: 'd',
      id: 4,
      username: 'd'
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

describe('<ProjectCard />', () => {
  let AD: JSX.Element;
  beforeAll(() => {
    global.matchMedia = global.matchMedia ?? function () {
      return {
        addListener: jest.fn(),
        removeListener: jest.fn()
      };
    };
  });
  it('should render project card', () => {
    AD = <MemoryRouter><Routes><Route path='' element={<ProjectCard project={ p } />} /></Routes></MemoryRouter>;
    const { container } = render(AD);
    const card = container.getElementsByClassName('project-card')[0];
    fireEvent.click(card);
  });
  it('should render project card', () => {
    AD = <MemoryRouter><Routes><Route path='' element={<ProjectCard project={ mp } />} /></Routes></MemoryRouter>;
    render(AD);
  });
});
