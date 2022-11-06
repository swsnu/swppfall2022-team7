import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter, Route, Routes } from 'react-router';
import ProjectMain from './ProjectMain';

const mockNavigate = jest.fn();
jest.mock('react-router', () => ({ ...jest.requireActual('react-router'), useNavigate: () => mockNavigate }));

describe('project main test', () => {
  let AD: JSX.Element;
  beforeAll(() => {
    AD = <MemoryRouter initialEntries={['/1']}><Routes><Route path="/:projectId" element={<ProjectMain />} /> </Routes></MemoryRouter>;
    global.matchMedia = global.matchMedia ?? function () {
      return {
        addListener: jest.fn(),
        removeListener: jest.fn()
      };
    };
  });
  it('should render without render', () => {
    render(<ProjectMain />);
    const menubuttons = screen.getAllByRole('menuitem');
    fireEvent.click(menubuttons[0]);
  });
  it('should handle with menu item clicked', () => {
    render(AD);
    const menubuttons = screen.getAllByRole('menuitem');
    act(() => {
      fireEvent.click(menubuttons[0]);
      fireEvent.click(menubuttons[1]);
    });
    const buttons = screen.getAllByRole('menuitem');
    act(() => {
      fireEvent.click(buttons[2]);
      fireEvent.click(buttons[3]);
      fireEvent.click(buttons[4]);
      fireEvent.click(buttons[5]);
    });
  });
});
