import { renderWithProviders } from '@utils/mocks';
import SpaceCard from './SpaceCard';

describe('<SpaceCard />', () => {
  let AD: JSX.Element;
  beforeAll(() => {
    global.matchMedia = global.matchMedia ?? function () {
      return {
        addListener: jest.fn(),
        removeListener: jest.fn()
      };
    };
  });
  it('should render space card', () => {
    AD = <SpaceCard name="tester" email="test@test.com" />;
    renderWithProviders(AD);
  });
});
