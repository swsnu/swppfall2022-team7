import { render } from '@testing-library/react';
import AutoOption from './AutoOption';

describe('<AutoOption />', () => {
  beforeAll(() => {
    global.matchMedia = global.matchMedia ?? function () {
      return {
        addListener: jest.fn(),
        removeListener: jest.fn()
      };
    };
  });
  it('should render', () => {
    render(<AutoOption />);
  });
});
