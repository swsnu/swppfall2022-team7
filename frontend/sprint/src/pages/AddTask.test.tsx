import { act, fireEvent, render, screen } from '@testing-library/react';
import AddTask from './AddTask';
import ReactRouter from 'react-router';
import axios from 'axios';
import { fakeUser1, fakeUser2 } from '@utils/testDummy';

const mockNavigate = jest.fn();
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  Navigate: (props: any) => {
    mockNavigate(props.to);
    return null;
  },
  useNavigate: () => mockNavigate
}));

describe('<AddTask />', () => {
  let AD: JSX.Element;
  beforeAll(() => {
    AD = <AddTask />;
    global.matchMedia = global.matchMedia ?? function () {
      return {
        addListener: jest.fn(),
        removeListener: jest.fn()
      };
    };
  });
  it('should render', async () => {
    axios.get = jest.fn().mockResolvedValue({ data: [fakeUser1, fakeUser2] });
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ projectId: '1' });
    render(AD);
  });
  it('should handle add', async () => {
    axios.get = jest.fn().mockResolvedValue({ data: [fakeUser1, fakeUser2] });
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ projectId: '1' });
    render(AD);
    const texts = screen.getAllByRole('textbox');
    await act(async () => { fireEvent.change(texts[0], { target: { value: 'a' } }); });
    await act(async () => { fireEvent.change(texts[1], { target: { value: 'a' } }); });
    const date = screen.getByPlaceholderText('Due Date');
    await act(async () => { fireEvent.change(date, { target: { value: '2022-12-29' } }); });
    const email = screen.getByRole('combobox');
    await act(async () => { fireEvent.change(email, { target: { value: 'asdf' } }); });
    const optionButton = screen.getByText('fakeUser2@fake.com');
    fireEvent.click(optionButton);
    const buttons = screen.getAllByRole('button');
    await act(async () => { fireEvent.click(buttons[0]); });
    await act(async () => { fireEvent.click(buttons[1]); });
  });
});
