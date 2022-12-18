import { fireEvent, render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import SpaceCard from './SpaceCard';

const mockNavigate = jest.fn();
jest.mock('react-router', () => ({ ...jest.requireActual('react-router'), useNavigate: () => mockNavigate }));

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
  it('should render space card', async () => {
    AD = <SpaceCard name='tester' email='test@test.com' />;
    render(AD);
  });
  it('should handle onClick', async () => {
    AD = <SpaceCard name='tester' email='test@test.com' />;
    const { container } = render(AD);
    await act(async () => { fireEvent.click(container.getElementsByClassName('member-card-container')[0]); });
  });
});
