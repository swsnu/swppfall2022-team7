import { fireEvent, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import ProjectMain from './ProjectMain';
import { renderWithProviders } from '@utils/mocks';
import { dummyProjects, ProjectType } from '@utils/testDummy';

const mockNavigate = jest.fn();
jest.mock('react-router', () => ({ ...jest.requireActual('react-router'), useNavigate: () => mockNavigate }));

const stubInitialState: ProjectType[] = dummyProjects;

const mockStore = { preloadedState: { project: stubInitialState } };

describe('project main test', () => {
  let AD: JSX.Element;
  beforeAll(() => {
    AD = <MemoryRouter initialEntries={['/1']}><Routes><Route path="/:projectId" element={<ProjectMain />} /> </Routes></MemoryRouter>;
    global.matchMedia = global.matchMedia ?? function () {
      return {
        addListener: jest.fn(),
        removeListener: jest.fn()
      };
    };
  });
  it('should render without render', () => {
    renderWithProviders(<ProjectMain />, mockStore);
    const menubuttons = screen.getAllByRole('menuitem');
    fireEvent.click(menubuttons[0]);
  });
  it('should handle with menu item clicked', () => {
    renderWithProviders(AD, mockStore);
    const menubuttons = screen.getAllByRole('menuitem');
    fireEvent.click(menubuttons[0]);
    fireEvent.click(menubuttons[1]);
    const buttons = screen.getAllByRole('menuitem');
    fireEvent.click(buttons[2]);
    fireEvent.click(buttons[3]);
    fireEvent.click(buttons[4]);
    fireEvent.click(buttons[5]);
  });
  it('should handle when project Id is undefined', () => {
    AD = <MemoryRouter initialEntries={['/6']}><Routes><Route path="/:project" element={<ProjectMain />} /> </Routes></MemoryRouter>;
    renderWithProviders(AD, mockStore);
    const buttons = screen.getAllByRole('menuitem');
    fireEvent.click(buttons[3]);
  });
  it('should handle when key is intro', () => {
    AD = <MemoryRouter initialEntries={['/1/1/1']}><Routes><Route path="/:projectId/:taskId/:menuId" element={<ProjectMain />} /> </Routes></MemoryRouter>;
    renderWithProviders(AD, mockStore);
    const buttons = screen.getAllByRole('menuitem');
    fireEvent.click(buttons[0]);
  });
  it('should handle when there is no task', () => {
    AD = <MemoryRouter initialEntries={['/1/1']}><Routes><Route path="/:projectId/:menuId" element={<ProjectMain />} /> </Routes></MemoryRouter>;
    renderWithProviders(AD, mockStore);
    const buttons = screen.getAllByRole('menuitem');
    fireEvent.click(buttons[0]);
  });
});
