import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { fakeUser1, fakeUser2 } from '@utils/testDummy';
import axios from 'axios';
import NewProject from './NewProject';

const mockNavigate = jest.fn();
jest.mock('react-router', () => ({ ...jest.requireActual('react-router'), useNavigate: () => mockNavigate }));

describe('<NewProject />', () => {
  let AD: JSX.Element;
  beforeAll(() => {
    AD = <NewProject />;
    global.matchMedia = global.matchMedia ?? function () {
      return {
        addListener: jest.fn(),
        removeListener: jest.fn()
      };
    };
  });
  it('should handle input', async () => {
    axios.get = jest.fn().mockResolvedValue({ data: [fakeUser1, fakeUser2] });
    axios.post = jest.fn();
    const { container } = render(AD);
    const projectNameInput = screen.getByPlaceholderText('Project Name');
    const subjectNameInput = screen.getByPlaceholderText('Subject Name');
    const createButton = screen.getAllByRole('button')[1];
    fireEvent.click(createButton);
    fireEvent.change(projectNameInput, { target: { value: 'Project Name' } });
    fireEvent.click(createButton);
    fireEvent.change(subjectNameInput, { target: { value: 'Subject Name' } });
    const emailInput = screen.getByRole('combobox');
    fireEvent.change(emailInput, { target: { value: 'asdf' }});
    await waitFor(() => { expect(screen.getByText('fakeUser2@fake.com')).toBeInTheDocument() });
    const optionButton = screen.getByText('fakeUser2@fake.com');
    fireEvent.click(optionButton);
    const inviteButton = screen.getAllByRole('button')[0];
    fireEvent.click(inviteButton);
    fireEvent.click(createButton);
    await waitFor(() => { expect(mockNavigate).toBeCalled() });
  });
});
