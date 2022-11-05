import { fireEvent, render, screen } from '@testing-library/react';
import NewProject from './NewProject';

describe('<NewProject />', () => {
  beforeAll(() => {
    global.matchMedia = global.matchMedia ?? function () {
      return {
        addListener: jest.fn(),
        removeListener: jest.fn()
      };
    };
  });
  it('should render', () => {
    render(<NewProject />);
  });
  it('should handle input', () => {
    const { container } = render(<NewProject />);
    const projectNameInput = screen.getByPlaceholderText('Project Name');
    const subjectNameInput = screen.getByPlaceholderText('Subject Name');
    const emailInput = container.querySelector('#invite-email');
    fireEvent.change(projectNameInput, { target: { value: 'Project Name' } });
    fireEvent.change(subjectNameInput, { target: { value: 'Subject Name' } });
    if (emailInput !== null) fireEvent.change(emailInput, 'Email');
  });
});
