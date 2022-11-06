import { fireEvent, render, screen } from '@testing-library/react';
import TaskDetail from './TaskDetail';

jest.mock('antd', () => ({ ...jest.requireActual('antd') }));

describe('task detail test', () => {
  let AD: JSX.Element;
  beforeAll(() => {
    AD = <TaskDetail taskContent='content' taskName='name'/>;
    global.matchMedia = global.matchMedia ?? function () {
      return {
        addListener: jest.fn(),
        removeListener: jest.fn()
      };
    };
  });
  it('should render without error', () => {
    render(AD);
  });
  it('should handle save after edit', () => {
    render(AD);
    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);
    const inputs = screen.getAllByRole('textbox');
    fireEvent.change(inputs[0], { target: { value: 'asdf' } });
    fireEvent.change(inputs[1], { target: { value: 'asdf' } });
    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);
  });
  it('should handld cancel after edit', () => {
    render(AD);
    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);
    const inputs = screen.getAllByRole('textbox');
    fireEvent.change(inputs[0], { target: { value: 'asdf' } });
    fireEvent.change(inputs[1], { target: { value: 'asdf' } });
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
  });
  it('should handle like and dislike', () => {
    const { container } = render(AD);
    const likes = container.getElementsByClassName('likeButton');
    fireEvent.click(likes[0]);
    const dislikes = container.getElementsByClassName('dislikeButton');
    fireEvent.click(dislikes[0]);
  });
});
