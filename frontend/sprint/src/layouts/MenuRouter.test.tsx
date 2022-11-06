import { render } from '@testing-library/react';
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
    render(AD);
  });
  it('should show menu router with taskId', () => {
    AD = <MemoryRouter initialEntries={['/1/1/1']}><Routes><Route path="/:projectId/:menuId/:taskId" element={<MenuRouter />} /></Routes></MemoryRouter>;
    render(AD);
  });
});
