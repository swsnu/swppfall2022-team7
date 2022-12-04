import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProjectCard from './ProjectCard';

const mp = {
  id: 1,
  name: 'name',
  subject: 'subject',
  manager: 1,
  last_modified: 'lm',
  member_list: [
    {
      username: 'a',
      id: 1,
      email: 'aa'
    },
    {
      username: 'b',
      id: 2,
      email: 'bb'
    }
  ],
  document_number: 1,
  task_list: [
    {
      id: 1,
      project: 1,
      assignee: {
        username: 'a',
        id: 1,
        email: 'aa'
      },
      name: 'task',
      content: 'content',
      createdAt: 'ca',
      updatedAt: 'ua',
      untilAt: 'ua'
    }
  ]
};

const p = {
  id: 1,
  name: 'name',
  subject: 'subject',
  manager: 1,
  last_modified: 'lm',
  member_list: [
    {
      username: 'a',
      id: 1,
      email: 'aa'
    },
    {
      username: 'c',
      id: 3,
      email: 'cc'
    },
    {
      username: 'd',
      id: 4,
      email: 'dd'
    },
    {
      username: 'b',
      id: 2,
      email: 'bb'
    }
  ],
  document_number: 1,
  task_list: [
    {
      id: 1,
      project: 1,
      assignee: {
        username: 'a',
        id: 1,
        email: 'aa'
      },
      name: 'task',
      content: 'content',
      createdAt: 'ca',
      updatedAt: 'ua',
      untilAt: 'ua'
    }
  ]
};

const mockNavigate = jest.fn();
jest.mock('react-router', () => ({ ...jest.requireActual('react-router'), useNavigate: () => mockNavigate }));

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
    AD = <MemoryRouter><Routes><Route path='' element={<ProjectCard project={ mp } />} /></Routes></MemoryRouter>;
    const { container } = render(AD);
    const card = container.getElementsByClassName('project-card')[0];
    fireEvent.click(card);
  });
  it('should render project card', () => {
    AD = <MemoryRouter><Routes><Route path='' element={<ProjectCard project={ p } />} /></Routes></MemoryRouter>;
    render(AD);
  });
});
