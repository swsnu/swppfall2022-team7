import { act, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import ProjectMain from './ProjectMain';
import { renderWithProviders } from '@utils/mocks';
import { dummyProjects, ProjectType } from '@utils/testDummy';

const mockNavigate = jest.fn();
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  Navigate: (props: any) => {
    mockNavigate(props.to);
    return null;
  },
  useNavigate: () => mockNavigate
}));

const stubInitialState: ProjectType[] = dummyProjects;

const mockStore = { preloadedState: { project: stubInitialState } };

describe('project main test', () => {
  let AD: JSX.Element;
  beforeAll(() => {
    AD = <MemoryRouter initialEntries={['/1']}><Routes><Route path='/:projectId' element={<ProjectMain />} /></Routes></MemoryRouter>;
    global.matchMedia = global.matchMedia ?? function () {
      return {
        addListener: jest.fn(),
        removeListener: jest.fn()
      };
    };
  });
  it('should render without render', async () => {
    renderWithProviders(<ProjectMain />, mockStore);
    const menubuttons = screen.getAllByRole('menuitem');
    await act(async () => { fireEvent.click(menubuttons[0]); });
  });
  it('should handle with menu item clicked', async () => {
    renderWithProviders(AD, mockStore);
    const buttons = screen.getAllByRole('menuitem');
    await act(async () => { fireEvent.click(buttons[0]); });
    await act(async () => { fireEvent.click(buttons[1]); });
    await act(async () => { fireEvent.click(buttons[2]); });
    await act(async () => { fireEvent.click(buttons[3]); });
    await act(async () => { fireEvent.click(buttons[4]); });
    await act(async () => { fireEvent.click(buttons[5]); });
  });
  it('should handle when project Id is undefined', async () => {
    AD = <MemoryRouter initialEntries={['/6']}><Routes><Route path="/:project" element={<ProjectMain />} /> </Routes></MemoryRouter>;
    renderWithProviders(AD, mockStore);
    const buttons = screen.getAllByRole('menuitem');
    await act(async () => { fireEvent.click(buttons[3]); });
  });
  it('should handle when key is intro', async () => {
    AD = <MemoryRouter initialEntries={['/1/1/1']}><Routes><Route path="/:projectId/:taskId/:menuId" element={<ProjectMain />} /> </Routes></MemoryRouter>;
    renderWithProviders(AD, mockStore);
    const buttons = screen.getAllByRole('menuitem');
    await act(async () => { fireEvent.click(buttons[0]); });
    await act(async () => { fireEvent.click(buttons[1]); });
    const taskButtons = screen.getAllByRole('menuitem');
    await act(async () => { fireEvent.click(taskButtons[2]); });
    await act(async () => { fireEvent.click(taskButtons[3]); });
    await act(async () => { fireEvent.click(taskButtons[4]); });
    await act(async () => { fireEvent.click(taskButtons[5]); });
  });
  it('should handle when there is no task', async () => {
    AD = <MemoryRouter initialEntries={['/1/1']}><Routes><Route path="/:projectId/:menuId" element={<ProjectMain />} /> </Routes></MemoryRouter>;
    renderWithProviders(AD, mockStore);
    const buttons = screen.getAllByRole('menuitem');
    await act(async () => { fireEvent.click(buttons[2]); });
  });
  it('should handle when there is wrong menu', async () => {
    AD = <MemoryRouter initialEntries={['/1/1']}><Routes><Route path="/:projectId/:taskId" element={<ProjectMain />} /> </Routes></MemoryRouter>;
    renderWithProviders(AD, mockStore);
    const buttons = screen.getAllByRole('menuitem');
    await act(async () => { fireEvent.click(buttons[2]); });
  });
});
