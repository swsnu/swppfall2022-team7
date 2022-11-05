import { render } from '@testing-library/react';
import Notification from './Notification';

describe('<Notification />', () => {
  global.matchMedia = global.matchMedia ?? function () {
    return {
      addListener: jest.fn(),
      removeListener: jest.fn()
    };
  };
  it('should render', () => {
    render(<Notification />);
  });
});
