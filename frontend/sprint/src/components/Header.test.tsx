import { fireEvent } from '@testing-library/react';
import { renderWithProviders } from '@utils/mocks';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Header from './Header';

const mockNavigate = jest.fn();
jest.mock('react-router', () => ({ ...jest.requireActual('react-router'), useNavigate: () => mockNavigate }));

describe('<Header />', () => {
  let AD: JSX.Element;
  beforeAll(() => {
    global.matchMedia = global.matchMedia ?? function () {
      return {
        addListener: jest.fn(),
        removeListener: jest.fn()
      };
    };
  });
  it('should show noti', () => {
    AD = <MemoryRouter><Routes><Route path="" element={<Header />} /></Routes></MemoryRouter>;
    const { container } = renderWithProviders(AD);
    const bellIcon = container.getElementsByClassName('bell-icon')[0];
    fireEvent.click(bellIcon);
  });
  it('should navigate when clicking logo', () => {
    AD = <MemoryRouter><Routes><Route path="" element={<Header />} /></Routes></MemoryRouter>;
    const { container } = renderWithProviders(AD);
    const logo = container.getElementsByClassName('header-logo')[0];
    fireEvent.click(logo);
  });
});
