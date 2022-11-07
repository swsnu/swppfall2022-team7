import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '@utils/mocks';
import { MemoryRouter } from 'react-router-dom';
import NewProject from './NewProject';

describe('<NewProject />', () => {
  let AD: JSX.Element;
  beforeAll(() => {
    AD = <MemoryRouter><NewProject /></MemoryRouter>;
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
  it('should handle input', () => {
    const { container } = renderWithProviders(AD);
    const projectNameInput = screen.getByPlaceholderText('Project Name');
    const subjectNameInput = screen.getByPlaceholderText('Subject Name');
    const emailInput = container.querySelector('#invite-email');
    const inviteButton = container.querySelectorAll('button[type=\'button\']')[0];
    const createButton = container.querySelectorAll('button[type=\'button\']')[1];
    fireEvent.click(createButton);
    fireEvent.change(projectNameInput, { target: { value: 'Project Name' } });
    fireEvent.change(subjectNameInput, { target: { value: 'Subject Name' } });
    fireEvent.change(emailInput, { target: { value: 'test' } });
    fireEvent.click(inviteButton);
    fireEvent.change(emailInput, { target: { value: 'brighthonor@snu.ac.kr' } });
    fireEvent.click(inviteButton);
    fireEvent.click(createButton);
  });
});
