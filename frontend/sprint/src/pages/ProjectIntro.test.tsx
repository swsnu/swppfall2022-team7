import useBindStore from '@store/zustand';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { fakeProject1 } from '@utils/testDummy';
import ProjectIntro from './ProjectIntro';

const mockNavigate = jest.fn();
jest.mock('react-router', () => ({ ...jest.requireActual('react-router'), useNavigate: () => mockNavigate }));

describe('project intro test', () => {
  let AD: JSX.Element;
  beforeAll(() => {
    AD = <ProjectIntro />;
    global.matchMedia = global.matchMedia ?? function () {
      return {
        addListener: jest.fn(),
        removeListener: jest.fn()
      };
    };
  });
  it('should render with link of space', async () => {
    const i = useBindStore.getState();
    i.selectedProject = fakeProject1;
    useBindStore.setState(i, true);
    render(AD);
    const editSpace = screen.getByText('Edit space');
    fireEvent.click(editSpace);
    await waitFor(() => { expect(mockNavigate).toBeCalled(); });
    const addNewTask = screen.getByText('Add new task');
    fireEvent.click(addNewTask);
    await waitFor(() => { expect(mockNavigate).toBeCalled(); });
    const checkbox = screen.getAllByRole('checkbox');
    fireEvent.click(checkbox[0]);
    const raButton = screen.getByText('Random Assign');
    fireEvent.click(raButton);
  });
});
