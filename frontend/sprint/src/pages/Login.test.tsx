import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';

const mockNavigate = jest.fn();
jest.mock('react-router', () => ({ ...jest.requireActual('react-router'), useNavigate: () => mockNavigate }));

describe('test Login page', () => {
  let AD: JSX.Element;
  beforeAll(() => {
    AD = <MemoryRouter><Login /></MemoryRouter>;
  });
  it('should handle login fail', async () => {
    render(AD);
    const email = screen.getByPlaceholderText('Example@snu.ac.kr');
    const password = screen.getByPlaceholderText('Password');
    fireEvent.change(email, { target: { value: 'testemail' } });
    fireEvent.change(password, { target: { value: 'testpassword' } });
    fireEvent.keyPress(password, { key: 'p', code: 112, charCode: 112 });
    fireEvent.keyPress(password, { key: 'Enter', code: 13, charCode: 13 });
    await waitFor(() => { expect(screen.getByText('Wrong email or password')).toBeInTheDocument(); });
  });
  it('should handle handle success', async () => {
    axios.post = jest.fn().mockResolvedValueOnce({ data: { token: 'fakeToken' } });
    render(AD);
    const email = screen.getByPlaceholderText('Example@snu.ac.kr');
    const password = screen.getByPlaceholderText('Password');
    fireEvent.change(email, { target: { value: 'testemail' } });
    fireEvent.change(password, { target: { value: 'testpassword' } });
    const login = screen.getByRole('button');
    fireEvent.click(login);
    await waitFor(() => { expect(mockNavigate).toBeCalled(); });
  });
});
