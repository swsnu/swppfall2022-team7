import useBindStore from '@store/zustand';
import { ProjectType } from '@store/zustand/project';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Route, Routes, MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import ProjectMain from './ProjectMain';
import { fakeProject1, fakeProject2 } from '@utils/testDummy';
import { act } from 'react-dom/test-utils';
import ReactRouter from 'react-router';

const mockNavigate = jest.fn();
jest.mock('react-router', () => ({ ...jest.requireActual('react-router'), useNavigate: () => mockNavigate }));

const fakeProjects: ProjectType[] = [fakeProject1, fakeProject2];

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
    const i = useBindStore.getState();
    i.projects = fakeProjects;
    useBindStore.setState(i, true);
    axios.get = jest.fn().mockResolvedValue(fakeProjectReturn);
    AD = <MemoryRouter initialEntries={['/1']}><Routes><Route path='/:projectId' element={<ProjectMain />} /></Routes></MemoryRouter>;
    render(AD);
    await waitFor(() => { expect(useBindStore.getState().selectedProject).toEqual(fakeProject1); });
    const buttons = screen.getAllByRole('menuitem');
    fireEvent.click(buttons[2]);
    await waitFor(() => { expect(mockNavigate).toBeCalled(); });
    fireEvent.click(buttons[3]);
    await waitFor(() => { expect(mockNavigate).toBeCalled(); });
    fireEvent.click(buttons[4]);
    await waitFor(() => { expect(mockNavigate).toBeCalled(); });
    fireEvent.click(buttons[5]);
    await waitFor(() => { expect(mockNavigate).toBeCalled(); });
    fireEvent.click(buttons[0]);
    await waitFor(() => { expect(mockNavigate).toBeCalled(); });
    fireEvent.click(buttons[1]);
    await waitFor(() => { expect(mockNavigate).toBeCalled(); });
    const nButtons = screen.getAllByRole('menuitem');
    fireEvent.click(nButtons[2]);
    await waitFor(() => { expect(mockNavigate).toBeCalled(); });
  });
  it('should render without error', async () => {
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ projectId: undefined, menuId: undefined, taskId: undefined });
    const i = useBindStore.getState();
    i.projects = fakeProjects;
    useBindStore.setState(i, true);
    axios.get = jest.fn().mockResolvedValue(fakeProjectReturn);
    AD = <ProjectMain />;
    await act(async () => { render(AD); });
  });
});
