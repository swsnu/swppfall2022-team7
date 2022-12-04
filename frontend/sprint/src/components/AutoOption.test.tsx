import { render } from '@testing-library/react';
import AutoOption from './AutoOption';

const choi = {
  username: 'choi',
  id: 1,
  email: 'email'
};

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
    render(<AutoOption member={choi} />);
  });
});
