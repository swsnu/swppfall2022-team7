import { renderWithProviders } from '@utils/mocks';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProjectManage from './ProjectManage';
import { choi, dummyProjects, ProjectType } from '@utils/testDummy';
import { fireEvent, screen } from '@testing-library/react';

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
      ],
      comments: [],
      dueDate: '',
      status: ''
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
      ],
      comments: [],
      dueDate: '',
      status: ''
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

describe('project manage page test', () => {
  let AD: JSX.Element;
  beforeAll(() => {
    AD = <MemoryRouter initialEntries={['/1']}><Routes><Route path='/:projectId' element={<ProjectManage />} /><Route path='*' element={<div />} /></Routes></MemoryRouter>;
    global.matchMedia = global.matchMedia ?? function () {
      return {
        addListener: jest.fn(),
        removeListener: jest.fn()
      };
    };
  });
  it('should be render without render', () => {
    renderWithProviders(AD, mockState);
  });
  it('should be render without render', () => {
    renderWithProviders(AD, mockState2);
  });
  it('should handle invite', () => {
    renderWithProviders(AD, mockState2);
    const Addbutton = screen.getByText('Add a new member');
    fireEvent.click(Addbutton);
    const emailInput = screen.getAllByRole('combobox');
    fireEvent.change(emailInput[0], { target: { value: 'poding84@snu.ac.kr' } });
    const inviteButton = screen.getByText('Invite');
    fireEvent.click(inviteButton);
    fireEvent.change(emailInput[0], { target: { value: '*' } });
    fireEvent.click(inviteButton);
    const confirmButton = screen.getByText('Confirm');
    fireEvent.click(confirmButton);
  });
  it('should handle invite cancel', () => {
    renderWithProviders(AD, mockState2);
    const Addbutton = screen.getByText('Add a new member');
    fireEvent.click(Addbutton);
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
  });
  it('should handle dissolve project', () => {
    renderWithProviders(AD, mockState2);
    const dissolveButton = screen.getAllByText('Dissolve Project');
    fireEvent.click(dissolveButton[1]);
    const warningInput = screen.getAllByRole('textbox');
    fireEvent.change(warningInput[0], { target: { value: 'SPRINT' } });
    const dissolveB = screen.getByText('Dissolve');
    fireEvent.click(dissolveB);
  });
  it('should handle dissolve project', () => {
    renderWithProviders(AD, mockState2);
    const dissolveButton = screen.getAllByText('Dissolve Project');
    fireEvent.click(dissolveButton[1]);
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
  });
  it('should handle when no params', () => {
    renderWithProviders(<MemoryRouter initialEntries={['/']}><Routes><Route path='/' element={<ProjectManage />} /><Route path='*' element={<div />} /></Routes></MemoryRouter>, mockState2);
  });
});
