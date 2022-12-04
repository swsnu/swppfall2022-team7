import useBindStore from "@store/zustand";
import { ProjectType } from "@store/zustand/project";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Route, Routes, MemoryRouter } from "react-router-dom";
import axios from "axios";
import ProjectMain from "./ProjectMain";

const mockNavigate = jest.fn();
jest.mock('react-router', () => ({ ...jest.requireActual('react-router'), useNavigate: () => mockNavigate }));


const fakeProject1: ProjectType = {
  document_number: 1,
  id: 1,
  last_modified: 'a',
  manager: 1,
  member_list: [
    {
      email: 'a',
      id: 1,
      username: 'a'
    }
  ],
  name: 'a',
  subject: 'a',
  document_space_list: [
    {
      created_at: 'a',
      head: 1,
      id: 1,
      name: 'a'
    },
    {
      created_at: 'b',
      head: 2,
      id: 2,
      name: 'b'
    }
  ],
  task_list: [
    {
      assignee: {
        email: 'a',
        id: 1,
        username: 'a'
      },
      content: 'a',
      createdAt: 'a',
      id: 1,
      name: 'a',
      project: 1,
      untilAt: 'a',
      updatedAt: 'a'
    }
  ]
};

const fakeProject2: ProjectType = {
  document_number: 2,
  id: 2,
  last_modified: 'a',
  manager: 2,
  member_list: [
    {
      email: 'a',
      id: 1,
      username: 'a'
    }
  ],
  name: 'b',
  subject: 'b',
  document_space_list: [
    {
      created_at: 'a',
      head: 1,
      id: 1,
      name: 'a'
    },
    {
      created_at: 'b',
      head: 2,
      id: 2,
      name: 'b'
    }
  ],
  task_list: [
    {
      assignee: {
        email: 'a',
        id: 1,
        username: 'a'
      },
      content: 'b',
      createdAt: 'b',
      id: 2,
      name: 'b',
      project: 2,
      untilAt: 'b',
      updatedAt: 'b'
    }
  ]
}

const fakeProjects: ProjectType[] = [ fakeProject1, fakeProject2 ];

const fakeProjectReturn = {
  data: fakeProject1
};

describe('ProjectMain Test', () => {
  let AD: JSX.Element;
  beforeAll(() => {
    global.matchMedia = global.matchMedia ?? function () {
      return {
        addListener: jest.fn(),
        removeListener: jest.fn()
      };
    };
  });
  it('should render without error', async () => {
    let i = useBindStore.getState();
    i.projects = fakeProjects;
    useBindStore.setState(i, true);
    axios.get = jest.fn().mockResolvedValue(fakeProjectReturn);
    AD = <MemoryRouter initialEntries={['/1']}><Routes><Route path='/:projectId' element={<ProjectMain />} /></Routes></MemoryRouter>;
    render(AD);
    await waitFor(() => { expect(useBindStore.getState().selectedProject).toEqual(fakeProject1) });
    const buttons = screen.getAllByRole('menuitem');
    fireEvent.click(buttons[2]);
    await waitFor(() => { expect(mockNavigate).toBeCalled() });
    fireEvent.click(buttons[3]);
    await waitFor(() => { expect(mockNavigate).toBeCalled() });
    fireEvent.click(buttons[4]);
    await waitFor(() => { expect(mockNavigate).toBeCalled() });
    fireEvent.click(buttons[5]);
    await waitFor(() => { expect(mockNavigate).toBeCalled() });
    fireEvent.click(buttons[0]);
    await waitFor(() => { expect(mockNavigate).toBeCalled() });
    fireEvent.click(buttons[1]);
    await waitFor(() => { expect(mockNavigate).toBeCalled() });
    const nButtons = screen.getAllByRole('menuitem');
    fireEvent.click(nButtons[2]);
    await waitFor(() => { expect(mockNavigate).toBeCalled() });
  });
});