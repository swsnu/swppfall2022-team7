import { fireEvent, render } from '@testing-library/react';
import Header from './Header';

describe('<Header />', () => {
  beforeAll(() => {
    global.matchMedia = global.matchMedia ?? function () {
      return {
        addListener: jest.fn(),
        removeListener: jest.fn()
      };
    };
  });
  it('should show noti', () => {
    const { container } = render(<Header />);
    const bellIcon = container.getElementsByClassName('bell-icon')[0];
    fireEvent.click(bellIcon);
  });
});
