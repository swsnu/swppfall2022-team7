import { fireEvent, screen } from '@testing-library/react';
import { dummyProjects, ProjectType } from '@utils/testDummy';
import { renderWithProviders } from '@utils/mocks';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import AddTask from './AddTask';

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

describe('<AddTask />', () => {
  let AD: JSX.Element;
  beforeAll(() => {
    global.matchMedia = global.matchMedia ?? function () {
      return {
        addListener: jest.fn(),
        removeListener: jest.fn()
      };
    };
  });
  it('should render AddTask', () => {
    AD = <MemoryRouter initialEntries={['/1']}><Routes><Route path="/:projectId" element={<AddTask />} /></Routes></MemoryRouter>;
    const { container } = renderWithProviders(AD, mockState);
    const name = screen.getByPlaceholderText('Task Name');
    const sub = screen.getByPlaceholderText('Description');
    const emailInput = container.querySelector('#invite-email');
    const inviteButton = container.querySelectorAll('button[type=\'button\']')[0];
    const createButton = container.querySelectorAll('button[type=\'button\']')[1];
    fireEvent.click(createButton);
    fireEvent.change(name, { target: { value: 'test' } });
    fireEvent.change(sub, { target: { value: 'test' } });
    fireEvent.change(emailInput, { target: { value: 'test' } });
    fireEvent.click(inviteButton);
    fireEvent.change(emailInput, { target: { value: 'brighthonor@snu.ac.kr' } });
    fireEvent.click(inviteButton);
    fireEvent.click(createButton);
  });
  it('should render AddTask without projectId', () => {
    AD = <MemoryRouter initialEntries={['/1']}><Routes><Route path="/:project" element={<AddTask />} /></Routes></MemoryRouter>;
    const { container } = renderWithProviders(AD, mockState);
    const name = screen.getByPlaceholderText('Task Name');
    const sub = screen.getByPlaceholderText('Description');
    const due = screen.getByPlaceholderText('Due Date');
    const createButton = container.querySelectorAll('button[type=\'button\']')[1];
    fireEvent.click(createButton);
    fireEvent.change(name, { target: { value: 'test' } });
    fireEvent.change(sub, { target: { value: 'test' } });
    fireEvent.change(due, { target: { value: 'test', title: 'test' } });
    fireEvent.click(createButton);
  });
});
