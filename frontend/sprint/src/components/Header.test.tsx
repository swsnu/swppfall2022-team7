import { fireEvent } from '@testing-library/react';
import { renderWithProviders } from '@utils/mocks';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Header from './Header';

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
});
