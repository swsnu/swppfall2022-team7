import { fireEvent } from '@testing-library/react';
import { testDummyProject } from '@utils/dummy';
import { renderWithProviders } from '@utils/mocks';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProjectCard from './ProjectCard';

const mockNavigate = jest.fn();
jest.mock('react-router', () => ({ ...jest.requireActual('react-router'), useNavigate: () => mockNavigate }));

describe('<ProjectCard />', () => {
  let AD: JSX.Element;
  const mockProject = testDummyProject;
  beforeAll(() => {
    global.matchMedia = global.matchMedia ?? function () {
      return {
        addListener: jest.fn(),
        removeListener: jest.fn()
      };
    };
  });
  it('should render project card', () => {
    AD = <MemoryRouter><Routes><Route path="" element={<ProjectCard project={mockProject} />} /></Routes></MemoryRouter>;
    const { container } = renderWithProviders(AD);
    const card = container.getElementsByClassName('project-card')[0];
    fireEvent.click(card);
  });
});
