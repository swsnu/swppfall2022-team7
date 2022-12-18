import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import SignUp from './SignUp';

const mockNavigate = jest.fn();
jest.mock('react-router', () => ({ ...jest.requireActual('react-router'), useNavigate: () => mockNavigate }));
jest.useFakeTimers();

describe('<SignUp />', () => {
  let AD: JSX.Element;
  beforeAll(() => {
    AD = <MemoryRouter initialEntries={['/']}><Routes><Route path='/' element={<SignUp />} /><Route path='*' element={<div />} /></Routes></MemoryRouter>;
  });
  it('should render without error', () => {
    render(AD);
  });
  it('should handle sign up success', async () => {
    axios.post = jest.fn();
    render(AD);
    const inputs = screen.getAllByRole('textbox');
    const pass = screen.getByPlaceholderText('Password');
    const pass2 = screen.getByPlaceholderText('Confirm Password');
    fireEvent.change(inputs[0], { target: { value: 'name' } });
    fireEvent.change(inputs[1], { target: { value: 'email' } });
    fireEvent.change(pass, { target: { value: 'password' } });
    fireEvent.change(pass2, { target: { value: 'password1' } });
    fireEvent.change(pass2, { target: { value: 'password' } });
    const signUp = screen.getByText('Create Account');
    await act(async () => { fireEvent.click(signUp); });
    await act(async () => { jest.advanceTimersByTime(4000); });
  });
  it('should handle sign up error', async () => {
    jest.spyOn(axios, 'post').mockRejectedValue(new Error('error'));
    jest.spyOn(global.console, 'log').mockImplementation(() => {});
    render(AD);
    const inputs = screen.getAllByRole('textbox');
    const pass = screen.getByPlaceholderText('Password');
    const pass2 = screen.getByPlaceholderText('Confirm Password');
    fireEvent.change(inputs[0], { target: { value: 'name' } });
    fireEvent.change(inputs[1], { target: { value: 'email' } });
    fireEvent.change(pass, { target: { value: 'password' } });
    fireEvent.change(pass2, { target: { value: 'password1' } });
    fireEvent.change(pass2, { target: { value: 'password' } });
    const signUp = screen.getByText('Create Account');
    await act(async () => { fireEvent.click(signUp); });
    await act(async () => { jest.advanceTimersByTime(4000); });
  });
});
