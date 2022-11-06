import { render } from '@testing-library/react';
import TaskCard from './TaskCard';

describe('<TaskCard />', () => {
  it('should show task card', () => {
    render(<TaskCard name="test" assignee="test"/>);
  });
});
