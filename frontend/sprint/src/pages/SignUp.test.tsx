import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import SignUp from './SignUp';

describe('sign up page test', () => {
  let AD: JSX.Element;
  beforeAll(() => {
    AD = <MemoryRouter initialEntries={['/']}><Routes><Route path='/' element={<SignUp />} /><Route path='*' element={<div />} /></Routes></MemoryRouter>;
  });
  it('should render without error', () => {
    render(AD);
  });
  it('should render without error', async () => {
    render(AD);
    const inputs = screen.getAllByRole('textbox');
    const pass = screen.getByPlaceholderText('Password');
    const pass2 = screen.getByPlaceholderText('Confirm Password');
    fireEvent.change(inputs[0], { target: { value: 'name' } });
    fireEvent.change(inputs[1], { target: { value: 'email' } });
    fireEvent.change(pass, { target: { value: 'password' } });
    fireEvent.change(pass2, { target: { value: 'password1' } });
    fireEvent.change(pass2, { target: { value: 'password' } });
    const login = screen.getByText('Create Account');
    fireEvent.click(login);
    await waitFor(() => { expect(screen.getByText('The email already exists!')).toBeInTheDocument(); });
  });
});
