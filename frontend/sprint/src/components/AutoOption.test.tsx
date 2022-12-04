import { render } from '@testing-library/react';
import AutoOption from './AutoOption';

const choi = {
  username: 'asdf',
  id: 1,
  email: 'Asdf'
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
