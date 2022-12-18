import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import NewProjectCard from './NewProjectCard';

const mockNavigate = jest.fn();
jest.mock('react-router', () => ({ ...jest.requireActual('react-router'), useNavigate: () => mockNavigate }));

describe('<NewProjectCard />', () => {
  let AD: JSX.Element;
  beforeAll(() => {
    AD = <NewProjectCard />;
    global.matchMedia = global.matchMedia ?? function () {
      return {
        addListener: jest.fn(),
        removeListener: jest.fn()
      };
    };
  });
  it('should render without error', async () => {
    render(AD);
    const b = screen.getByText('Add a New Project!');
    await act(async () => { fireEvent.click(b); });
  });
});
