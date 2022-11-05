import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

const mockNavigate = jest.fn();
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  Navigate: (props: any) => {
    mockNavigate(props.to);
    return null;
  },
  useNavigate: () => mockNavigate
}));

describe('<Home />', () => {
  beforeAll(() => {
    global.matchMedia = global.matchMedia ?? function () {
      return {
        addListener: jest.fn(),
        removeListener: jest.fn()
      };
    };
  });
  it('should render', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
  });
  it('should navigate', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    const toNewProject = screen.getByText('New Project');
    fireEvent.click(toNewProject);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });
});
