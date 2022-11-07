import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '@utils/mocks';
import TaskDetail from './TaskDetail';

jest.mock('antd', () => ({ ...jest.requireActual('antd') }));

describe('task detail test', () => {
  let AD: JSX.Element;
  beforeAll(() => {
    AD = <TaskDetail />;
    global.matchMedia = global.matchMedia ?? function () {
      return {
        addListener: jest.fn(),
        removeListener: jest.fn()
      };
    };
  });
  it('should render without error', () => {
    renderWithProviders(AD);
  });
  it('should handle save after edit', () => {
    renderWithProviders(AD);
    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);
    const inputs = screen.getAllByRole('textbox');
    fireEvent.change(inputs[0], { target: { value: 'asdf' } });
    fireEvent.change(inputs[1], { target: { value: 'asdf' } });
    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);
  });
  it('should handld cancel after edit', () => {
    renderWithProviders(AD);
    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);
    const inputs = screen.getAllByRole('textbox');
    fireEvent.change(inputs[0], { target: { value: 'asdf' } });
    fireEvent.change(inputs[1], { target: { value: 'asdf' } });
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
  });
  it('should handle like and dislike', () => {
    const { container } = renderWithProviders(AD);
    const likes = container.getElementsByClassName('likeButton');
    fireEvent.click(likes[0]);
    const dislikes = container.getElementsByClassName('dislikeButton');
    fireEvent.click(dislikes[0]);
  });
});
