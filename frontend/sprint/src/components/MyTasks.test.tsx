import { dummyProjects, ProjectType } from '@utils/testDummy';
import { renderWithProviders } from '@utils/mocks';
import MyTask from './MyTasks';
import { fireEvent, screen } from '@testing-library/react';

const mockNavigate = jest.fn();
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  Navigate: (props: any) => {
    mockNavigate(props.to);
    return null;
  },
  useNavigate: () => mockNavigate
}));

const stubInitialState: ProjectType[] = dummyProjects;

const mockState = {
  preloadedState: {
    project: stubInitialState
  }
};

describe('<MyTask />', () => {
  let AD: JSX.Element;
  beforeAll(() => {
    AD = <MyTask />;
    global.matchMedia = global.matchMedia ?? function () {
      return {
        addListener: jest.fn(),
        removeListener: jest.fn()
      };
    };
  });
  it('should render my task', () => {
    renderWithProviders(AD, mockState);
  });
  it('should handle task click', () => {
    renderWithProviders(AD, mockState);
    const tab = screen.getAllByRole('tab')[1];
    fireEvent.click(tab);
    const task = screen.getByRole('listitem');
    fireEvent.click(task);
  });
});
