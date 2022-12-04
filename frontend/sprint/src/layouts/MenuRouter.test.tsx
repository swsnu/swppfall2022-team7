import { renderWithProviders } from '@utils/mocks';
import { dummyProjects, DProjectType } from '@utils/testDummy';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import MenuRouter from './MenuRouter';

const stubInitialState: DProjectType[] = dummyProjects;

const mockState = { preloadedState: { project: stubInitialState } };

const TaskDetail = (): JSX.Element => <div />;
jest.mock('../pages/TaskDetail', () => TaskDetail);

const ProjectDocument = (): JSX.Element => <div />;
jest.mock('../pages/ProjectDocument', () => ProjectDocument);

describe('<MenuRouter />', () => {
  let AD: JSX.Element;
  beforeAll(() => {
    jest.useFakeTimers();
    global.matchMedia = global.matchMedia ?? function () {
      return {
        addListener: jest.fn(),
        removeListener: jest.fn()
      };
    };
  });
  it('should show menu router without taskId', () => {
    AD = <MemoryRouter initialEntries={['/1/1']}><Routes><Route path="/:projectId/:menuId" element={<MenuRouter />} /><Route path='*' element={<div />} /></Routes></MemoryRouter>;
    renderWithProviders(AD, mockState);
  });
  it('should show menu router with taskId', () => {
    AD = <MemoryRouter initialEntries={['/1/1/1']}><Routes><Route path="/:projectId/:menuId/:taskId" element={<MenuRouter />} /><Route path='*' element={<div />} /></Routes></MemoryRouter>;
    renderWithProviders(AD, mockState);
  });
  it('should show menu router when menuId is add_task', () => {
    AD = <MemoryRouter initialEntries={['/1/add_task/1']}><Routes><Route path="/:projectId/:menuId/:taskId" element={<MenuRouter />} /><Route path='*' element={<div />} /></Routes></MemoryRouter>;
    renderWithProviders(AD, mockState);
  });
  it('should show menu router when menuId is docs', () => {
    AD = <MemoryRouter initialEntries={['/1/docs/1']}><Routes><Route path="/:projectId/:menuId/:taskId" element={<MenuRouter />} /><Route path='*' element={<div />} /></Routes></MemoryRouter>;
    renderWithProviders(AD, mockState);
  });
  it('should show menu router when menuId is cal', () => {
    AD = <MemoryRouter initialEntries={['/1/cal/1']}><Routes><Route path="/:projectId/:menuId/:taskId" element={<MenuRouter />} /><Route path='*' element={<div />} /></Routes></MemoryRouter>;
    renderWithProviders(AD, mockState);
  });
  it('should show menu router when menuId is contrib', () => {
    AD = <MemoryRouter initialEntries={['/1/contrib/1']}><Routes><Route path="/:projectId/:menuId/:taskId" element={<MenuRouter />} /><Route path='*' element={<div />} /></Routes></MemoryRouter>;
    renderWithProviders(AD, mockState);
  });
});
