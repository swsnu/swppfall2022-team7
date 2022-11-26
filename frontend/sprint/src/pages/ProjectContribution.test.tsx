import { renderWithProviders } from '@utils/mocks';
import { MemoryRouter } from 'react-router-dom';
import ProjectContribution from './ProjectContribution';

describe('<NewProject />', () => {
  let AD: JSX.Element;
  beforeAll(() => {
    AD = <MemoryRouter><ProjectContribution /></MemoryRouter>;
    global.matchMedia = global.matchMedia ?? function () {
      return {
        addListener: jest.fn(),
        removeListener: jest.fn()
      };
    };
  });
  it('should render', () => {
    renderWithProviders(AD);
  });
});
