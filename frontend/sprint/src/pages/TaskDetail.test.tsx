import { render } from '@testing-library/react';
import TaskDetail from './TaskDetail';

const mockComment = jest.fn();
jest.mock('antd', () => ({...jest.requireActual('antd'), }))

describe('task detail test', () => {
  let AD: JSX.Element;
  beforeAll(() => {
    AD = <TaskDetail taskContent='content' taskName='name'/>;
    global.matchMedia = global.matchMedia ?? function() {
      return {
        addListener: jest.fn(),
        removeListener: jest.fn()
      };
    };
  });
  it('should render without error', () => {
    render(AD);
  })
});