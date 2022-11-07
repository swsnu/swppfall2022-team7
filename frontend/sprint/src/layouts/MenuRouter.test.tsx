import { renderWithProviders } from '@utils/mocks';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import MenuRouter from './MenuRouter';

describe('<TaskCard />', () => {
  let AD: JSX.Element;
  beforeAll(() => {
    global.matchMedia = global.matchMedia ?? function () {
      return {
        addListener: jest.fn(),
        removeListener: jest.fn()
      };
    };
  });
  it('should show menu router without taskId', () => {
    AD = <MemoryRouter initialEntries={['/1/1']}><Routes><Route path="/:projectId/:menuId" element={<MenuRouter />} /></Routes></MemoryRouter>;
    renderWithProviders(AD);
  });
  it('should show menu router with taskId', () => {
    AD = <MemoryRouter initialEntries={['/1/1/1']}><Routes><Route path="/:projectId/:menuId/:taskId" element={<MenuRouter />} /></Routes></MemoryRouter>;
    renderWithProviders(AD);
  });
  it('should show menu router when menuId is add_task', () => {
    AD = <MemoryRouter initialEntries={['/1/add_task/1']}><Routes><Route path="/:projectId/:menuId/:taskId" element={<MenuRouter />} /></Routes></MemoryRouter>;
    renderWithProviders(AD);
  });
});
